using Microsoft.EntityFrameworkCore;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Domain.Entities;
using Services.Catalog.Infrastructure.Persistence;

namespace Services.Catalog.Infrastructure.Repositories;

public class WishlistRepository : IWishlistRepository
{
    private readonly CatalogDbContext _context;

    public WishlistRepository(CatalogDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyCollection<WishlistItem>> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default)
    {
        return await _context.WishlistItems
            .Include(w => w.Product)
                .ThenInclude(p => p.Category)
            .Include(w => w.Product)
                .ThenInclude(p => p.ProductImages)
            .Where(w => w.UserId == userId)
            .OrderByDescending(w => w.CreatedAt)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<WishlistItem?> GetByUserAndProductAsync(int userId, int productId, CancellationToken cancellationToken = default)
    {
        return await _context.WishlistItems
            .FirstOrDefaultAsync(w => w.UserId == userId && w.ProductId == productId, cancellationToken);
    }

    public async Task AddAsync(WishlistItem item, CancellationToken cancellationToken = default)
    {
        // Check if already exists
        var exists = await ExistsAsync(item.UserId, item.ProductId, cancellationToken);
        if (!exists)
        {
            await _context.WishlistItems.AddAsync(item, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var item = await _context.WishlistItems.FindAsync(new object[] { id }, cancellationToken);
        if (item != null)
        {
            _context.WishlistItems.Remove(item);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    public async Task<bool> ExistsAsync(int userId, int productId, CancellationToken cancellationToken = default)
    {
        return await _context.WishlistItems
            .AnyAsync(w => w.UserId == userId && w.ProductId == productId, cancellationToken);
    }
}
