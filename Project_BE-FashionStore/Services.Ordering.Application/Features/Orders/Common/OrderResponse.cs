namespace Services.Ordering.Application.Features.Orders.Common;

public sealed record OrderItemResponse(
    int Id,
    int ProductId,
    int? ProductVariantId,
    string ProductNameSnapshot,
    string? ColorSnapshot,
    string? SizeSnapshot,
    decimal UnitPrice,
    int Quantity,
    decimal LineTotal);

public sealed record OrderResponse(
    int Id,
    string OrderCode,
    string Status,
    string PaymentMethod,
    string PaymentStatus,
    string ShippingName,
    string ShippingPhone,
    string ShippingEmail,
    string ShippingAddress,
    string? City,
    string? District,
    string? Ward,
    string? Note,
    decimal Subtotal,
    decimal ShippingFee,
    decimal DiscountAmount,
    decimal TotalAmount,
    DateTime CreatedAtUtc,
    IReadOnlyCollection<OrderItemResponse> Items);
