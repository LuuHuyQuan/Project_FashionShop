using Microsoft.EntityFrameworkCore;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Domain.Entities;
using Services.Catalog.Infrastructure.Persistence;

namespace Services.Catalog.Infrastructure;

public sealed class CatalogLookupRepository : ICatalogLookupRepository
{
    private readonly CatalogDbContext _dbContext;

    public CatalogLookupRepository(CatalogDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyCollection<ProductImage>> GetProductImagesAsync(int productId, CancellationToken cancellationToken = default)
    {
        return await _dbContext.ProductImages
            .AsNoTracking()
            .Where(x => x.ProductId == productId)
            .OrderBy(x => x.SortOrder)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<ProductVariant>> GetProductVariantsAsync(int productId, CancellationToken cancellationToken = default)
    {
        return await _dbContext.ProductVariants
            .AsNoTracking()
            .Where(x => x.ProductId == productId)
            .OrderBy(x => x.Id)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<Color>> GetColorsAsync(CancellationToken cancellationToken = default)
    {
        return await _dbContext.Colors
            .AsNoTracking()
            .OrderBy(x => x.Name)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<Size>> GetSizesAsync(CancellationToken cancellationToken = default)
    {
        return await _dbContext.Sizes
            .AsNoTracking()
            .OrderBy(x => x.Name)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<Review>> GetProductReviewsAsync(int productId, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Reviews
            .AsNoTracking()
            .Where(x => x.ProductId == productId)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task AddReviewAsync(Review review, CancellationToken cancellationToken = default)
    {
        await _dbContext.Reviews.AddAsync(review, cancellationToken);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return _dbContext.SaveChangesAsync(cancellationToken);
    }
}
