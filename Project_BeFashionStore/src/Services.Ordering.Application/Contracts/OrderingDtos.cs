namespace Services.Ordering.Application.Contracts;

public sealed record AddressDto(int Id, int UserId, string RecipientName, string Phone, string AddressLine, string? City, string? District, string? Ward, bool IsDefault);

public sealed record CartItemDto(int Id, int CartId, int ProductVariantId, int Quantity, decimal UnitPriceSnapshot);

public sealed record CartDto(int Id, int UserId, DateTime UpdatedAt, IEnumerable<CartItemDto> Items);

public sealed record OrderItemDto(int Id, int OrderId, int ProductId, int? ProductVariantId, string ProductNameSnapshot, string? ColorSnapshot, string? SizeSnapshot, decimal UnitPrice, int Quantity, decimal LineTotal);

public sealed record OrderDto(int Id, string OrderCode, int UserId, string Status, string PaymentMethod, string PaymentStatus, string ShippingName, string ShippingPhone, string ShippingEmail, string ShippingAddress, string? City, string? District, string? Ward, string? Note, decimal Subtotal, decimal ShippingFee, decimal DiscountAmount, decimal TotalAmount, DateTime CreatedAt, IEnumerable<OrderItemDto> Items);

public sealed record ReviewDto(int Id, int UserId, int ProductId, int Rating, string? Comment, DateTime CreatedAt);

public sealed record WishlistItemDto(int Id, int UserId, int ProductId, DateTime CreatedAt);
