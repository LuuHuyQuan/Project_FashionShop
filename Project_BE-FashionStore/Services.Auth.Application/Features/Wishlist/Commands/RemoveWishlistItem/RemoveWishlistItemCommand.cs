using MediatR;

namespace Services.Auth.Application.Features.Wishlist.Commands.RemoveWishlistItem;

public sealed record RemoveWishlistItemCommand(int UserId, int ProductId) : IRequest<Unit>;
