using Microsoft.EntityFrameworkCore;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Domain.Entities;
using Services.Catalog.Infrastructure.Persistence;

namespace Services.Catalog.Infrastructure.Repositories;

public class ProductImageRepository : IProductImageRepository
{
    private readonly CatalogDbContext _context;

    public ProductImageRepository(CatalogDbContext context)
    {
        _context = context;
    }

    public async Task<ProductImage?> GetByIdAsync(int id)
    {
        return await _context.ProductImages
            .Include(pi => pi.Product)
            .FirstOrDefaultAsync(pi => pi.Id == id);
    }

    public async Task<IEnumerable<ProductImage>> GetByProductIdAsync(int productId)
    {
        return await _context.ProductImages
            .Where(pi => pi.ProductId == productId)
            .OrderBy(pi => pi.SortOrder)
            .ToListAsync();
    }

    public async Task<ProductImage> CreateAsync(ProductImage image)
    {
        _context.ProductImages.Add(image);
        await _context.SaveChangesAsync();
        return image;
    }

    public async Task<ProductImage> UpdateAsync(ProductImage image)
    {
        _context.ProductImages.Update(image);
        await _context.SaveChangesAsync();
        return image;
    }

    public async Task DeleteAsync(int id)
    {
        var image = await _context.ProductImages.FindAsync(id);
        if (image != null)
        {
            _context.ProductImages.Remove(image);
            await _context.SaveChangesAsync();
        }
    }
}
