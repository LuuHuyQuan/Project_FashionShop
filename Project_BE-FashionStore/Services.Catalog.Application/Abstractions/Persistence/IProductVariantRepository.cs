using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Abstractions.Persistence;

public interface IProductVariantRepository
{
    Task<ProductVariant?> GetByIdAsync(int id);
    Task<ProductVariant?> GetBySKUAsync(string sku);
    Task<IEnumerable<ProductVariant>> GetByProductIdAsync(int productId);
    Task<ProductVariant> CreateAsync(ProductVariant variant);
    Task<ProductVariant> UpdateAsync(ProductVariant variant);
    Task DeleteAsync(int id);
}
