using Microsoft.EntityFrameworkCore;
using Services.Catalog.Application.Abstractions;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Infrastructure.Persistence;

public sealed class CatalogDbContext(DbContextOptions<CatalogDbContext> options) : DbContext(options), ICatalogDbContext
{
    public DbSet<Category> CategoriesSet => Set<Category>();
    public DbSet<Product> ProductsSet => Set<Product>();
    public DbSet<ProductVariant> ProductVariantsSet => Set<ProductVariant>();
    public DbSet<ProductImage> ProductImagesSet => Set<ProductImage>();

    public IQueryable<Category> Categories => CategoriesSet.AsQueryable();
    public IQueryable<Product> Products => ProductsSet
        .Include(x => x.Category)
        .Include(x => x.Variants)
        .Include(x => x.Images)
        .AsQueryable();
    public IQueryable<ProductVariant> ProductVariants => ProductVariantsSet.AsQueryable();
    public IQueryable<ProductImage> ProductImages => ProductImagesSet.AsQueryable();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(CatalogDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }

    public async Task<Category> AddCategoryAsync(Category category, CancellationToken cancellationToken)
    {
        await CategoriesSet.AddAsync(category, cancellationToken);
        return category;
    }

    public async Task<Product> AddProductAsync(Product product, CancellationToken cancellationToken)
    {
        await ProductsSet.AddAsync(product, cancellationToken);
        return product;
    }

    public async Task<ProductVariant> AddProductVariantAsync(ProductVariant productVariant, CancellationToken cancellationToken)
    {
        await ProductVariantsSet.AddAsync(productVariant, cancellationToken);
        return productVariant;
    }

    public async Task<ProductImage> AddProductImageAsync(ProductImage productImage, CancellationToken cancellationToken)
    {
        await ProductImagesSet.AddAsync(productImage, cancellationToken);
        return productImage;
    }

    public void RemoveCategory(Category category) => CategoriesSet.Remove(category);
    public void RemoveProduct(Product product) => ProductsSet.Remove(product);
    public void RemoveProductVariant(ProductVariant productVariant) => ProductVariantsSet.Remove(productVariant);
}
