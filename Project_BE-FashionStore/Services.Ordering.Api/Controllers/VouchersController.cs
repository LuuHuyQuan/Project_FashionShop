using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Services.Ordering.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VouchersController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public VouchersController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("validate")]
    public async Task<IActionResult> ValidateVoucher([FromBody] ValidateVoucherRequest request)
    {
        try
        {
            var connectionString = _configuration.GetConnectionString("FashionStoreDb");
            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            var query = @"
                SELECT 
                    Id, Code, Name, Description,
                    DiscountType, DiscountValue,
                    MinOrderAmount, MaxDiscountAmount,
                    TotalQuantity, UsedQuantity,
                    StartDate, EndDate, Status
                FROM dbo.Vouchers
                WHERE Code = @Code 
                    AND Status = 'active'
                    AND GETDATE() BETWEEN StartDate AND EndDate
                    AND (TotalQuantity IS NULL OR UsedQuantity < TotalQuantity)";

            using var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@Code", request.Code);

            using var reader = await command.ExecuteReaderAsync();

            if (!await reader.ReadAsync())
            {
                return BadRequest(new { message = "Mã giảm giá không hợp lệ hoặc đã hết hạn" });
            }

            var voucher = new
            {
                id = reader.GetInt32(0),
                code = reader.GetString(1),
                name = reader.GetString(2),
                description = reader.IsDBNull(3) ? null : reader.GetString(3),
                discountType = reader.GetString(4),
                discountValue = reader.GetDecimal(5),
                minOrderAmount = reader.IsDBNull(6) ? (decimal?)null : reader.GetDecimal(6),
                maxDiscountAmount = reader.IsDBNull(7) ? (decimal?)null : reader.GetDecimal(7),
                totalQuantity = reader.IsDBNull(8) ? (int?)null : reader.GetInt32(8),
                usedQuantity = reader.GetInt32(9),
                startDate = reader.GetDateTime(10),
                endDate = reader.GetDateTime(11),
                status = reader.GetString(12)
            };

            // Check minimum order amount
            if (voucher.minOrderAmount.HasValue && request.OrderAmount < voucher.minOrderAmount.Value)
            {
                return BadRequest(new 
                { 
                    message = $"Đơn hàng tối thiểu {voucher.minOrderAmount.Value:N0}đ để sử dụng mã này" 
                });
            }

            // Calculate discount amount
            decimal discountAmount = 0;
            if (voucher.discountType == "percentage")
            {
                discountAmount = request.OrderAmount * (voucher.discountValue / 100);
                if (voucher.maxDiscountAmount.HasValue && discountAmount > voucher.maxDiscountAmount.Value)
                {
                    discountAmount = voucher.maxDiscountAmount.Value;
                }
            }
            else if (voucher.discountType == "fixed")
            {
                discountAmount = voucher.discountValue;
                if (voucher.maxDiscountAmount.HasValue && discountAmount > voucher.maxDiscountAmount.Value)
                {
                    discountAmount = voucher.maxDiscountAmount.Value;
                }
            }

            return Ok(new
            {
                voucher.id,
                voucher.code,
                voucher.name,
                voucher.description,
                voucher.discountType,
                voucher.discountValue,
                discountAmount,
                voucher.minOrderAmount,
                voucher.maxDiscountAmount
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi kiểm tra mã giảm giá", error = ex.Message });
        }
    }

    [HttpGet("active")]
    public async Task<IActionResult> GetActiveVouchers()
    {
        try
        {
            var connectionString = _configuration.GetConnectionString("FashionStoreDb");
            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            var query = @"
                SELECT 
                    Id, Code, Name, Description,
                    DiscountType, DiscountValue,
                    MinOrderAmount, MaxDiscountAmount,
                    TotalQuantity, UsedQuantity,
                    StartDate, EndDate
                FROM dbo.Vouchers
                WHERE Status = 'active'
                    AND GETDATE() BETWEEN StartDate AND EndDate
                    AND (TotalQuantity IS NULL OR UsedQuantity < TotalQuantity)
                ORDER BY CreatedAt DESC";

            using var command = new SqlCommand(query, connection);
            using var reader = await command.ExecuteReaderAsync();

            var vouchers = new List<object>();
            while (await reader.ReadAsync())
            {
                vouchers.Add(new
                {
                    id = reader.GetInt32(0),
                    code = reader.GetString(1),
                    name = reader.GetString(2),
                    description = reader.IsDBNull(3) ? null : reader.GetString(3),
                    discountType = reader.GetString(4),
                    discountValue = reader.GetDecimal(5),
                    minOrderAmount = reader.IsDBNull(6) ? (decimal?)null : reader.GetDecimal(6),
                    maxDiscountAmount = reader.IsDBNull(7) ? (decimal?)null : reader.GetDecimal(7),
                    totalQuantity = reader.IsDBNull(8) ? (int?)null : reader.GetInt32(8),
                    usedQuantity = reader.GetInt32(9),
                    remainingQuantity = reader.IsDBNull(8) ? (int?)null : reader.GetInt32(8) - reader.GetInt32(9),
                    startDate = reader.GetDateTime(10),
                    endDate = reader.GetDateTime(11)
                });
            }

            return Ok(vouchers);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi lấy danh sách voucher", error = ex.Message });
        }
    }
}

public record ValidateVoucherRequest(string Code, decimal OrderAmount);
