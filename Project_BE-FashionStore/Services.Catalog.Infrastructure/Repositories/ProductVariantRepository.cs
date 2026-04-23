using Microsoft.EntityFrameworkCore;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Domain.Entities;
using Services.Catalog.Infrastructure.Persistence;

namespace Services.Catalog.Infrastructure.Repositories;

public class ProductVariantRepository : IProductVariantRepository
{
    private readonly CatalogDbContext _context;

    public ProductVariantRepository(CatalogDbContext context)
    {
        _context = context;
    }

    public async Task<ProductVariant?> GetByIdAsync(int id)
    {
        return await _context.ProductVariants
            .Include(pv => pv.Product)
            .Include(pv => pv.Color)
            .Include(pv => pv.Size)
            .FirstOrDefaultAsync(pv => pv.Id == id);
    }

    public async Task<ProductVariant?> GetBySKUAsync(string sku)
    {
        return await _context.ProductVariants
            .Include(pv => pv.Product)
            .Include(pv => pv.Color)
            .Include(pv => pv.Size)
            .FirstOrDefaultAsync(pv => pv.SKU == sku);
    }

    public async Task<IEnumerable<ProductVariant>> GetByProductIdAsync(int productId)
    {
        return await _context.ProductVariants
            .Include(pv => pv.Color)
            .Include(pv => pv.Size)
            .Where(pv => pv.ProductId == productId)
            .ToListAsync();
    }

    public async Task<ProductVariant> CreateAsync(ProductVariant variant)
    {
        _context.ProductVariants.Add(variant);
        await _context.SaveChangesAsync();
        return variant;
    }

    public async Task<ProductVariant> UpdateAsync(ProductVariant variant)
    {
        _context.ProductVariants.Update(variant);
        await _context.SaveChangesAsync();
        return variant;
    }

    public async Task DeleteAsync(int id)
    {
        var variant = await _context.ProductVariants.FindAsync(id);
        if (variant != null)
        {
            _context.ProductVariants.Remove(variant);
            await _context.SaveChangesAsync();
        }
    }
}
