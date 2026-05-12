using MediatR;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Services.Ordering.Application.Features.Orders.Common;
using System.Data;
using System.Text.Json;

namespace Services.Ordering.Application.Features.Orders.Commands.Checkout;

public sealed class CheckoutCommandHandler : IRequestHandler<CheckoutCommand, OrderResponse>
{
    private readonly IConfiguration _configuration;

    public CheckoutCommandHandler(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<OrderResponse> Handle(CheckoutCommand request, CancellationToken cancellationToken)
    {
        var connectionString = _configuration.GetConnectionString("FashionStoreDb");

        using var connection = new SqlConnection(connectionString);
        await connection.OpenAsync(cancellationToken);

        using var command = new SqlCommand("sp_CreateOrderWithStockManagement", connection);
        command.CommandType = CommandType.StoredProcedure;
        command.CommandTimeout = 60;

        // Add parameters
        command.Parameters.AddWithValue("@UserId", request.UserId);
        command.Parameters.AddWithValue("@VoucherId", (object?)request.VoucherId ?? DBNull.Value);
        command.Parameters.AddWithValue("@ShippingName", request.ShippingName);
        command.Parameters.AddWithValue("@ShippingPhone", request.ShippingPhone);
        command.Parameters.AddWithValue("@ShippingEmail", request.ShippingEmail);
        command.Parameters.AddWithValue("@ShippingAddress", request.ShippingAddress);
        command.Parameters.AddWithValue("@City", (object?)request.City ?? DBNull.Value);
        command.Parameters.AddWithValue("@District", (object?)request.District ?? DBNull.Value);
        command.Parameters.AddWithValue("@Ward", (object?)request.Ward ?? DBNull.Value);
        command.Parameters.AddWithValue("@Note", (object?)request.Note ?? DBNull.Value);
        command.Parameters.AddWithValue("@PaymentMethod", request.PaymentMethod);
        command.Parameters.AddWithValue("@ShippingFee", request.ShippingFee);

        // Convert order items to JSON
        var orderItemsJson = JsonSerializer.Serialize(request.Items.Select(item => new
        {
            productId = item.ProductId,
            productVariantId = item.ProductVariantId,
            productName = item.ProductNameSnapshot,
            colorName = item.ColorSnapshot,
            sizeName = item.SizeSnapshot,
            unitPrice = item.UnitPrice,
            quantity = item.Quantity
        }));

        command.Parameters.AddWithValue("@OrderItemsJson", orderItemsJson);

        // Execute stored procedure and read result
        using var reader = await command.ExecuteReaderAsync(cancellationToken);

        if (!await reader.ReadAsync(cancellationToken))
        {
            throw new Exception("Failed to create order - No data returned from stored procedure");
        }

        // Map result to OrderResponse
        var orderId = reader.GetInt32(reader.GetOrdinal("Id"));
        var orderCode = reader.GetString(reader.GetOrdinal("OrderCode"));
        var userId = reader.GetInt32(reader.GetOrdinal("UserId"));
        var status = reader.GetString(reader.GetOrdinal("Status"));
        var paymentMethod = reader.GetString(reader.GetOrdinal("PaymentMethod"));
        var paymentStatus = reader.GetString(reader.GetOrdinal("PaymentStatus"));
        var shippingName = reader.GetString(reader.GetOrdinal("ShippingName"));
        var shippingPhone = reader.GetString(reader.GetOrdinal("ShippingPhone"));
        var shippingEmail = reader.GetString(reader.GetOrdinal("ShippingEmail"));
        var shippingAddress = reader.GetString(reader.GetOrdinal("ShippingAddress"));
        var city = reader.IsDBNull(reader.GetOrdinal("City")) ? null : reader.GetString(reader.GetOrdinal("City"));
        var district = reader.IsDBNull(reader.GetOrdinal("District")) ? null : reader.GetString(reader.GetOrdinal("District"));
        var ward = reader.IsDBNull(reader.GetOrdinal("Ward")) ? null : reader.GetString(reader.GetOrdinal("Ward"));
        var note = reader.IsDBNull(reader.GetOrdinal("Note")) ? null : reader.GetString(reader.GetOrdinal("Note"));
        var subtotal = reader.GetDecimal(reader.GetOrdinal("Subtotal"));
        var shippingFee = reader.GetDecimal(reader.GetOrdinal("ShippingFee"));
        var discountAmount = reader.GetDecimal(reader.GetOrdinal("DiscountAmount"));
        var totalAmount = reader.GetDecimal(reader.GetOrdinal("TotalAmount"));
        var createdAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt"));

        // Parse order items from JSON column
        var orderItemsJsonColumn = reader.IsDBNull(reader.GetOrdinal("OrderItemsJson")) 
            ? "[]" 
            : reader.GetString(reader.GetOrdinal("OrderItemsJson"));

        // Close reader before deserializing
        await reader.CloseAsync();

        var orderItems = JsonSerializer.Deserialize<List<OrderItemDto>>(orderItemsJsonColumn) ?? new List<OrderItemDto>();

        var orderItemResponses = orderItems.Select(item => new OrderItemResponse(
            item.Id,
            item.ProductId,
            item.ProductVariantId,
            item.ProductNameSnapshot,
            item.ColorSnapshot,
            item.SizeSnapshot,
            item.UnitPrice,
            item.Quantity,
            item.LineTotal
        )).ToArray();

        return new OrderResponse(
            orderId,
            orderCode,
            status,
            paymentMethod,
            paymentStatus,
            shippingName,
            shippingPhone,
            shippingEmail,
            shippingAddress,
            city,
            district,
            ward,
            note,
            subtotal,
            shippingFee,
            discountAmount,
            totalAmount,
            createdAt,
            orderItemResponses
        );
    }

    private sealed class OrderItemDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int? ProductVariantId { get; set; }
        public string ProductNameSnapshot { get; set; } = string.Empty;
        public string? ColorSnapshot { get; set; }
        public string? SizeSnapshot { get; set; }
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public decimal LineTotal { get; set; }
    }
}
