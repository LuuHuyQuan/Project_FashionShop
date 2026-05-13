using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Services.Ordering.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "admin")]
public class DashboardController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public DashboardController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        try
        {
            var connectionString = _configuration.GetConnectionString("FashionStoreDb");
            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            var query = @"
                -- Total Revenue
                SELECT 
                    ISNULL(SUM(TotalAmount), 0) AS TotalRevenue,
                    COUNT(*) AS TotalOrders,
                    ISNULL(AVG(TotalAmount), 0) AS AverageOrderValue
                FROM dbo.Orders
                WHERE Status != 'cancelled';

                -- Orders by Status
                SELECT 
                    Status,
                    COUNT(*) AS Count
                FROM dbo.Orders
                GROUP BY Status;

                -- Revenue Today
                SELECT 
                    ISNULL(SUM(TotalAmount), 0) AS RevenueToday,
                    COUNT(*) AS OrdersToday
                FROM dbo.Orders
                WHERE CAST(CreatedAt AS DATE) = CAST(GETDATE() AS DATE)
                    AND Status != 'cancelled';

                -- Revenue This Month
                SELECT 
                    ISNULL(SUM(TotalAmount), 0) AS RevenueThisMonth,
                    COUNT(*) AS OrdersThisMonth
                FROM dbo.Orders
                WHERE YEAR(CreatedAt) = YEAR(GETDATE())
                    AND MONTH(CreatedAt) = MONTH(GETDATE())
                    AND Status != 'cancelled';

                -- Total Customers
                SELECT COUNT(DISTINCT UserId) AS TotalCustomers
                FROM dbo.Orders;

                -- Total Products Sold
                SELECT ISNULL(SUM(Quantity), 0) AS TotalProductsSold
                FROM dbo.OrderItems oi
                INNER JOIN dbo.Orders o ON oi.OrderId = o.Id
                WHERE o.Status != 'cancelled';
            ";

            using var command = new SqlCommand(query, connection);
            using var reader = await command.ExecuteReaderAsync();

            // Read Total Revenue
            await reader.ReadAsync();
            var totalRevenue = reader.GetDecimal(0);
            var totalOrders = reader.GetInt32(1);
            var averageOrderValue = reader.GetDecimal(2);

            // Read Orders by Status
            await reader.NextResultAsync();
            var ordersByStatus = new Dictionary<string, int>();
            while (await reader.ReadAsync())
            {
                ordersByStatus[reader.GetString(0)] = reader.GetInt32(1);
            }

            // Read Revenue Today
            await reader.NextResultAsync();
            await reader.ReadAsync();
            var revenueToday = reader.GetDecimal(0);
            var ordersToday = reader.GetInt32(1);

            // Read Revenue This Month
            await reader.NextResultAsync();
            await reader.ReadAsync();
            var revenueThisMonth = reader.GetDecimal(0);
            var ordersThisMonth = reader.GetInt32(1);

            // Read Total Customers
            await reader.NextResultAsync();
            await reader.ReadAsync();
            var totalCustomers = reader.GetInt32(0);

            // Read Total Products Sold
            await reader.NextResultAsync();
            await reader.ReadAsync();
            var totalProductsSold = reader.GetInt32(0);

            return Ok(new
            {
                totalRevenue,
                totalOrders,
                averageOrderValue,
                ordersByStatus,
                revenueToday,
                ordersToday,
                revenueThisMonth,
                ordersThisMonth,
                totalCustomers,
                totalProductsSold
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error fetching dashboard stats", error = ex.Message });
        }
    }

    [HttpGet("recent-orders")]
    public async Task<IActionResult> GetRecentOrders([FromQuery] int limit = 10)
    {
        try
        {
            var connectionString = _configuration.GetConnectionString("FashionStoreDb");
            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            var query = @"
                SELECT TOP (@Limit)
                    o.Id,
                    o.OrderCode,
                    o.UserId,
                    u.FullName AS CustomerName,
                    o.Status,
                    o.PaymentMethod,
                    o.PaymentStatus,
                    o.TotalAmount,
                    o.CreatedAt,
                    (SELECT COUNT(*) FROM dbo.OrderItems WHERE OrderId = o.Id) AS ItemCount
                FROM dbo.Orders o
                LEFT JOIN dbo.Users u ON o.UserId = u.Id
                ORDER BY o.CreatedAt DESC";

            using var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@Limit", limit);
            using var reader = await command.ExecuteReaderAsync();

            var orders = new List<object>();
            while (await reader.ReadAsync())
            {
                orders.Add(new
                {
                    id = reader.GetInt32(0),
                    orderCode = reader.GetString(1),
                    userId = reader.GetInt32(2),
                    customerName = reader.IsDBNull(3) ? "Unknown" : reader.GetString(3),
                    status = reader.GetString(4),
                    paymentMethod = reader.GetString(5),
                    paymentStatus = reader.GetString(6),
                    totalAmount = reader.GetDecimal(7),
                    createdAt = reader.GetDateTime(8),
                    itemCount = reader.GetInt32(9)
                });
            }

            return Ok(orders);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error fetching recent orders", error = ex.Message });
        }
    }

    [HttpGet("top-products")]
    public async Task<IActionResult> GetTopProducts([FromQuery] int limit = 10)
    {
        try
        {
            var connectionString = _configuration.GetConnectionString("FashionStoreDb");
            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            var query = @"
                SELECT TOP (@Limit)
                    p.Id,
                    p.Name,
                    p.Price,
                    SUM(oi.Quantity) AS TotalSold,
                    SUM(oi.LineTotal) AS TotalRevenue,
                    COUNT(DISTINCT oi.OrderId) AS OrderCount
                FROM dbo.OrderItems oi
                INNER JOIN dbo.Products p ON oi.ProductId = p.Id
                INNER JOIN dbo.Orders o ON oi.OrderId = o.Id
                WHERE o.Status != 'cancelled'
                GROUP BY p.Id, p.Name, p.Price
                ORDER BY TotalSold DESC";

            using var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@Limit", limit);
            using var reader = await command.ExecuteReaderAsync();

            var products = new List<object>();
            while (await reader.ReadAsync())
            {
                products.Add(new
                {
                    id = reader.GetInt32(0),
                    name = reader.GetString(1),
                    price = reader.GetDecimal(2),
                    totalSold = reader.GetInt32(3),
                    totalRevenue = reader.GetDecimal(4),
                    orderCount = reader.GetInt32(5)
                });
            }

            return Ok(products);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error fetching top products", error = ex.Message });
        }
    }

    [HttpGet("revenue-chart")]
    public async Task<IActionResult> GetRevenueChart([FromQuery] int days = 30)
    {
        try
        {
            var connectionString = _configuration.GetConnectionString("FashionStoreDb");
            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            var query = @"
                SELECT 
                    CAST(CreatedAt AS DATE) AS Date,
                    COUNT(*) AS OrderCount,
                    SUM(TotalAmount) AS Revenue
                FROM dbo.Orders
                WHERE CreatedAt >= DATEADD(DAY, -@Days, GETDATE())
                    AND Status != 'cancelled'
                GROUP BY CAST(CreatedAt AS DATE)
                ORDER BY Date";

            using var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@Days", days);
            using var reader = await command.ExecuteReaderAsync();

            var data = new List<object>();
            while (await reader.ReadAsync())
            {
                data.Add(new
                {
                    date = reader.GetDateTime(0).ToString("yyyy-MM-dd"),
                    orderCount = reader.GetInt32(1),
                    revenue = reader.GetDecimal(2)
                });
            }

            return Ok(data);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error fetching revenue chart", error = ex.Message });
        }
    }
}
