using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
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
    [Authorize]
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

    [HttpGet]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> GetAllVouchers()
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
                    StartDate, EndDate, Status, CreatedAt
                FROM dbo.Vouchers
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
                    endDate = reader.GetDateTime(11),
                    status = reader.GetString(12),
                    createdAt = reader.GetDateTime(13)
                });
            }

            return Ok(vouchers);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi lấy danh sách voucher", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> GetVoucherById(int id)
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
                    StartDate, EndDate, Status, CreatedAt
                FROM dbo.Vouchers
                WHERE Id = @Id";

            using var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@Id", id);
            using var reader = await command.ExecuteReaderAsync();

            if (!await reader.ReadAsync())
            {
                return NotFound(new { message = "Không tìm thấy voucher" });
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
                status = reader.GetString(12),
                createdAt = reader.GetDateTime(13)
            };

            return Ok(voucher);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi lấy thông tin voucher", error = ex.Message });
        }
    }

    [HttpPost]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> CreateVoucher([FromBody] CreateVoucherRequest request)
    {
        try
        {
            var connectionString = _configuration.GetConnectionString("FashionStoreDb");
            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            var query = @"
                INSERT INTO dbo.Vouchers 
                (Code, Name, Description, DiscountType, DiscountValue, 
                 MinOrderAmount, MaxDiscountAmount, TotalQuantity, UsedQuantity,
                 StartDate, EndDate, Status, CreatedAt, UpdatedAt)
                VALUES 
                (@Code, @Name, @Description, @DiscountType, @DiscountValue,
                 @MinOrderAmount, @MaxDiscountAmount, @TotalQuantity, 0,
                 @StartDate, @EndDate, @Status, GETDATE(), GETDATE());
                SELECT CAST(SCOPE_IDENTITY() as int);";

            using var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@Code", request.Code);
            command.Parameters.AddWithValue("@Name", request.Name);
            command.Parameters.AddWithValue("@Description", (object?)request.Description ?? DBNull.Value);
            command.Parameters.AddWithValue("@DiscountType", request.DiscountType);
            command.Parameters.AddWithValue("@DiscountValue", request.DiscountValue);
            command.Parameters.AddWithValue("@MinOrderAmount", (object?)request.MinOrderAmount ?? DBNull.Value);
            command.Parameters.AddWithValue("@MaxDiscountAmount", (object?)request.MaxDiscountAmount ?? DBNull.Value);
            command.Parameters.AddWithValue("@TotalQuantity", (object?)request.TotalQuantity ?? DBNull.Value);
            command.Parameters.AddWithValue("@StartDate", request.StartDate);
            command.Parameters.AddWithValue("@EndDate", request.EndDate);
            command.Parameters.AddWithValue("@Status", request.Status ?? "active");

            var newId = (int)await command.ExecuteScalarAsync();

            return Ok(new { id = newId, message = "Tạo voucher thành công" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi tạo voucher", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> UpdateVoucher(int id, [FromBody] UpdateVoucherRequest request)
    {
        try
        {
            var connectionString = _configuration.GetConnectionString("FashionStoreDb");
            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            var query = @"
                UPDATE dbo.Vouchers
                SET Code = @Code,
                    Name = @Name,
                    Description = @Description,
                    DiscountType = @DiscountType,
                    DiscountValue = @DiscountValue,
                    MinOrderAmount = @MinOrderAmount,
                    MaxDiscountAmount = @MaxDiscountAmount,
                    TotalQuantity = @TotalQuantity,
                    StartDate = @StartDate,
                    EndDate = @EndDate,
                    Status = @Status,
                    UpdatedAt = GETDATE()
                WHERE Id = @Id";

            using var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@Id", id);
            command.Parameters.AddWithValue("@Code", request.Code);
            command.Parameters.AddWithValue("@Name", request.Name);
            command.Parameters.AddWithValue("@Description", (object?)request.Description ?? DBNull.Value);
            command.Parameters.AddWithValue("@DiscountType", request.DiscountType);
            command.Parameters.AddWithValue("@DiscountValue", request.DiscountValue);
            command.Parameters.AddWithValue("@MinOrderAmount", (object?)request.MinOrderAmount ?? DBNull.Value);
            command.Parameters.AddWithValue("@MaxDiscountAmount", (object?)request.MaxDiscountAmount ?? DBNull.Value);
            command.Parameters.AddWithValue("@TotalQuantity", (object?)request.TotalQuantity ?? DBNull.Value);
            command.Parameters.AddWithValue("@StartDate", request.StartDate);
            command.Parameters.AddWithValue("@EndDate", request.EndDate);
            command.Parameters.AddWithValue("@Status", request.Status);

            var rowsAffected = await command.ExecuteNonQueryAsync();

            if (rowsAffected == 0)
            {
                return NotFound(new { message = "Không tìm thấy voucher" });
            }

            return Ok(new { message = "Cập nhật voucher thành công" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi cập nhật voucher", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> DeleteVoucher(int id)
    {
        try
        {
            var connectionString = _configuration.GetConnectionString("FashionStoreDb");
            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            var query = "DELETE FROM dbo.Vouchers WHERE Id = @Id";

            using var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@Id", id);

            var rowsAffected = await command.ExecuteNonQueryAsync();

            if (rowsAffected == 0)
            {
                return NotFound(new { message = "Không tìm thấy voucher" });
            }

            return Ok(new { message = "Xóa voucher thành công" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi xóa voucher", error = ex.Message });
        }
    }
}

public record ValidateVoucherRequest(string Code, decimal OrderAmount);

public record CreateVoucherRequest(
    string Code,
    string Name,
    string? Description,
    string DiscountType,
    decimal DiscountValue,
    decimal? MinOrderAmount,
    decimal? MaxDiscountAmount,
    int? TotalQuantity,
    DateTime StartDate,
    DateTime EndDate,
    string? Status
);

public record UpdateVoucherRequest(
    string Code,
    string Name,
    string? Description,
    string DiscountType,
    decimal DiscountValue,
    decimal? MinOrderAmount,
    decimal? MaxDiscountAmount,
    int? TotalQuantity,
    DateTime StartDate,
    DateTime EndDate,
    string Status
);
