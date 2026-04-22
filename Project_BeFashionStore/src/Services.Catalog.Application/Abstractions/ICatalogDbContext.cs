using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Abstractions;

public interface ICatalogDbContext
{
    IQueryable<Category> Categories { get; }
    IQueryable<Product> Products { get; }
    IQueryable<ProductVariant> ProductVariants { get; }
    IQueryable<ProductImage> ProductImages { get; }

    Task<Category> AddCategoryAsync(Category category, CancellationToken cancellationToken);
    Task<Product> AddProductAsync(Product product, CancellationToken cancellationToken);
    Task<ProductVariant> AddProductVariantAsync(ProductVariant productVariant, CancellationToken cancellationToken);
    Task<ProductImage> AddProductImageAsync(ProductImage productImage, CancellationToken cancellationToken);
    void RemoveCategory(Category category);
    void RemoveProduct(Product product);
    void RemoveProductVariant(ProductVariant productVariant);
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
