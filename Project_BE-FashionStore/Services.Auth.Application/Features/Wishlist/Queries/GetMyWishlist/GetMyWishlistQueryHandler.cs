using MediatR;
using Services.Auth.Application.Abstractions.Persistence;
using Services.Auth.Application.Features.Wishlist.Common;

namespace Services.Auth.Application.Features.Wishlist.Queries.GetMyWishlist;

public sealed class GetMyWishlistQueryHandler : IRequestHandler<GetMyWishlistQuery, IReadOnlyCollection<WishlistItemResponse>>
{
    private readonly IWishlistRepository _wishlistRepository;

    public GetMyWishlistQueryHandler(IWishlistRepository wishlistRepository)
    {
        _wishlistRepository = wishlistRepository;
    }

    public async Task<IReadOnlyCollection<WishlistItemResponse>> Handle(GetMyWishlistQuery request, CancellationToken cancellationToken)
    {
        var items = await _wishlistRepository.GetByUserIdAsync(request.UserId, cancellationToken);
        return items
            .Select(item => new WishlistItemResponse(item.Id, item.ProductId, item.CreatedAt))
            .ToArray();
    }
}
