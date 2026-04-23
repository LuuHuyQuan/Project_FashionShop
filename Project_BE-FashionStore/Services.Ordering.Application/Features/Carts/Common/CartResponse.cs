namespace Services.Ordering.Application.Features.Carts.Common;

public sealed record CartItemResponse(
    int Id,
    int ProductVariantId,
    int Quantity,
    decimal UnitPriceSnapshot);

public sealed record CartResponse(
    int Id,
    int UserId,
    DateTime UpdatedAt,
    IReadOnlyCollection<CartItemResponse> Items);
