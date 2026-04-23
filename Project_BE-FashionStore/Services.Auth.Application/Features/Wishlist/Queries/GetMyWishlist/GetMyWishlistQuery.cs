using MediatR;
using Services.Auth.Application.Features.Wishlist.Common;

namespace Services.Auth.Application.Features.Wishlist.Queries.GetMyWishlist;

public sealed record GetMyWishlistQuery(int UserId) : IRequest<IReadOnlyCollection<WishlistItemResponse>>;
