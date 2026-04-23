using MediatR;
using Services.Auth.Application.Abstractions.Persistence;
using Services.Auth.Application.Features.Wishlist.Common;
using Services.Auth.Domain.Entities;

namespace Services.Auth.Application.Features.Wishlist.Commands.AddWishlistItem;

public sealed class AddWishlistItemCommandHandler : IRequestHandler<AddWishlistItemCommand, WishlistItemResponse>
{
    private readonly IWishlistRepository _wishlistRepository;

    public AddWishlistItemCommandHandler(IWishlistRepository wishlistRepository)
    {
        _wishlistRepository = wishlistRepository;
    }

    public async Task<WishlistItemResponse> Handle(AddWishlistItemCommand request, CancellationToken cancellationToken)
    {
        var existing = await _wishlistRepository.GetByUserAndProductAsync(request.UserId, request.ProductId, cancellationToken);
        if (existing is not null)
        {
            return new WishlistItemResponse(existing.Id, existing.ProductId, existing.CreatedAt);
        }

        var item = new WishlistItem(request.UserId, request.ProductId);
        await _wishlistRepository.AddAsync(item, cancellationToken);
        await _wishlistRepository.SaveChangesAsync(cancellationToken);

        return new WishlistItemResponse(item.Id, item.ProductId, item.CreatedAt);
    }
}
