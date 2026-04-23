using Microsoft.EntityFrameworkCore;
using Services.Auth.Application.Abstractions.Persistence;
using Services.Auth.Domain.Entities;

namespace Services.Auth.Infrastructure.Persistence.Repositories;

public sealed class WishlistRepository : IWishlistRepository
{
    private readonly AuthDbContext _dbContext;

    public WishlistRepository(AuthDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyCollection<WishlistItem>> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default)
    {
        return await _dbContext.WishlistItems
            .Where(x => x.UserId == userId)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public Task<WishlistItem?> GetByUserAndProductAsync(int userId, int productId, CancellationToken cancellationToken = default)
    {
        return _dbContext.WishlistItems
            .FirstOrDefaultAsync(x => x.UserId == userId && x.ProductId == productId, cancellationToken);
    }

    public async Task AddAsync(WishlistItem item, CancellationToken cancellationToken = default)
    {
        await _dbContext.WishlistItems.AddAsync(item, cancellationToken);
    }

    public void Remove(WishlistItem item)
    {
        _dbContext.WishlistItems.Remove(item);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return _dbContext.SaveChangesAsync(cancellationToken);
    }
}
