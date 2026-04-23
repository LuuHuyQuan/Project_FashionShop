using Microsoft.EntityFrameworkCore;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Domain.Entities;
using Services.Catalog.Infrastructure.Persistence;

namespace Services.Catalog.Infrastructure;

public sealed class ProductRepository : IProductRepository
{
    private readonly CatalogDbContext _dbContext;

    public ProductRepository(CatalogDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyCollection<Product>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _dbContext.Products
            .AsNoTracking()
            .OrderBy(product => product.Id)
            .ToListAsync(cancellationToken);
    }

    public Task<Product?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return _dbContext.Products.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public Task<Product?> GetBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        var normalized = slug.Trim().ToLowerInvariant();
        return _dbContext.Products.FirstOrDefaultAsync(x => x.Slug == normalized, cancellationToken);
    }

    public async Task AddAsync(Product product, CancellationToken cancellationToken = default)
    {
        await _dbContext.Products.AddAsync(product, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Product product, CancellationToken cancellationToken = default)
    {
        _dbContext.Products.Update(product);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
