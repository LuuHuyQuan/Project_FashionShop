using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Abstractions.Persistence;

public interface IProductImageRepository
{
    Task<ProductImage?> GetByIdAsync(int id);
    Task<IEnumerable<ProductImage>> GetByProductIdAsync(int productId);
    Task<ProductImage> CreateAsync(ProductImage image);
    Task<ProductImage> UpdateAsync(ProductImage image);
    Task DeleteAsync(int id);
}
