using Services.Auth.Domain.Entities;

namespace Services.Auth.Application.Abstractions.Persistence;

public interface IWishlistRepository
{
    Task<IReadOnlyCollection<WishlistItem>> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default);
    Task<WishlistItem?> GetByUserAndProductAsync(int userId, int productId, CancellationToken cancellationToken = default);
    Task AddAsync(WishlistItem wishlistItem, CancellationToken cancellationToken = default);
    void Remove(WishlistItem wishlistItem);
    Task SaveChangesAsync(CancellationToken cancellationToken = default);
}
