namespace Services.Auth.Application.Features.Wishlist.Common;

public sealed record WishlistItemResponse(
    int Id,
    int ProductId,
    DateTime CreatedAt);
