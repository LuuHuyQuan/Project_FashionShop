using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Abstractions.Persistence;

public interface IWishlistRepository
{
    Task<IReadOnlyCollection<WishlistItem>> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default);
    Task<WishlistItem?> GetByUserAndProductAsync(int userId, int productId, CancellationToken cancellationToken = default);
    Task AddAsync(WishlistItem item, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(int userId, int productId, CancellationToken cancellationToken = default);
}
