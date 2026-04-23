using Microsoft.EntityFrameworkCore;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Domain.Entities;
using Services.Catalog.Infrastructure.Persistence;

namespace Services.Catalog.Infrastructure.Repositories;

public class CatalogLookupRepository : ICatalogLookupRepository
{
    private readonly CatalogDbContext _context;

    public CatalogLookupRepository(CatalogDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyCollection<ProductImage>> GetProductImagesAsync(int productId, CancellationToken cancellationToken = default)
    {
        return await _context.ProductImages
            .Where(pi => pi.ProductId == productId)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<ProductVariant>> GetProductVariantsAsync(int productId, CancellationToken cancellationToken = default)
    {
        return await _context.ProductVariants
            .Include(pv => pv.Color)
            .Include(pv => pv.Size)
            .Where(pv => pv.ProductId == productId)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<Color>> GetColorsAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Colors
            .OrderBy(c => c.Name)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<Size>> GetSizesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Sizes
            .OrderBy(s => s.Name)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<Review>> GetProductReviewsAsync(int productId, CancellationToken cancellationToken = default)
    {
        return await _context.Reviews
            .Where(r => r.ProductId == productId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task AddReviewAsync(Review review, CancellationToken cancellationToken = default)
    {
        await _context.Reviews.AddAsync(review, cancellationToken);
    }

    public async Task SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        await _context.SaveChangesAsync(cancellationToken);
    }
}
