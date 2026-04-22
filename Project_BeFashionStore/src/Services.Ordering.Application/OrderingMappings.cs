using Services.Ordering.Application.Contracts;
using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Application;

internal static class OrderingMappings
{
    public static AddressDto MapAddress(Address entity) => new(entity.Id, entity.UserId, entity.RecipientName, entity.Phone, entity.AddressLine, entity.City, entity.District, entity.Ward, entity.IsDefault);

    public static CartDto MapCart(Cart entity) => new(
        entity.Id,
        entity.UserId,
        entity.UpdatedAt,
        entity.Items.Select(x => new CartItemDto(x.Id, x.CartId, x.ProductVariantId, x.Quantity, x.UnitPriceSnapshot)).ToList());

    public static ReviewDto MapReview(Review entity) => new(entity.Id, entity.UserId, entity.ProductId, entity.Rating, entity.Comment, entity.CreatedAt);

    public static WishlistItemDto MapWishlistItem(WishlistItem entity) => new(entity.Id, entity.UserId, entity.ProductId, entity.CreatedAt);

    public static OrderDto MapOrder(Order entity) => new(
        entity.Id,
        entity.OrderCode,
        entity.UserId,
        entity.Status,
        entity.PaymentMethod,
        entity.PaymentStatus,
        entity.ShippingName,
        entity.ShippingPhone,
        entity.ShippingEmail,
        entity.ShippingAddress,
        entity.City,
        entity.District,
        entity.Ward,
        entity.Note,
        entity.Subtotal,
        entity.ShippingFee,
        entity.DiscountAmount,
        entity.TotalAmount,
        entity.CreatedAt,
        entity.Items.Select(x => new OrderItemDto(x.Id, x.OrderId, x.ProductId, x.ProductVariantId, x.ProductNameSnapshot, x.ColorSnapshot, x.SizeSnapshot, x.UnitPrice, x.Quantity, x.LineTotal)).ToList());
}
