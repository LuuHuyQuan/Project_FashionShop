using MediatR;
using Services.Auth.Application.Abstractions.Persistence;

namespace Services.Auth.Application.Features.Wishlist.Commands.RemoveWishlistItem;

public sealed class RemoveWishlistItemCommandHandler : IRequestHandler<RemoveWishlistItemCommand, Unit>
{
    private readonly IWishlistRepository _wishlistRepository;

    public RemoveWishlistItemCommandHandler(IWishlistRepository wishlistRepository)
    {
        _wishlistRepository = wishlistRepository;
    }

    public async Task<Unit> Handle(RemoveWishlistItemCommand request, CancellationToken cancellationToken)
    {
        var item = await _wishlistRepository.GetByUserAndProductAsync(request.UserId, request.ProductId, cancellationToken)
            ?? throw new KeyNotFoundException("Wishlist item not found.");

        _wishlistRepository.Remove(item);
        await _wishlistRepository.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
