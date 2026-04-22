using BuildingBlocks.Application;
using Services.Catalog.Application.Abstractions;
using Services.Catalog.Application.Contracts;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Features.Products;

public sealed record CreateProductCommand(
    int CategoryId,
    string Name,
    string Slug,
    string? Description,
    decimal Price,
    decimal? OldPrice,
    string Status,
    string? Badge) : ICommand<ProductDto>;

public sealed record UpdateProductCommand(
    int Id,
    int CategoryId,
    string Name,
    string Slug,
    string? Description,
    decimal Price,
    decimal? OldPrice,
    string Status,
    string? Badge) : ICommand<ProductDto>;

public sealed record DeleteProductCommand(int Id) : ICommand<bool>;
public sealed record GetProductByIdQuery(int Id) : IQuery<ProductDto>;
public sealed record GetProductsQuery() : IQuery<IReadOnlyList<ProductDto>>;

public sealed class CreateProductCommandHandler(ICatalogDbContext dbContext) : ICommandHandler<CreateProductCommand, ProductDto>
{
    public async Task<ProductDto> Handle(CreateProductCommand command, CancellationToken cancellationToken)
    {
        _ = dbContext.Categories.FirstOrDefault(x => x.Id == command.CategoryId)
            ?? throw new KeyNotFoundException("Category not found.");

        var product = new Product
        {
            CategoryId = command.CategoryId,
            Name = command.Name.Trim(),
            Slug = command.Slug.Trim().ToLowerInvariant(),
            Description = command.Description,
            Price = command.Price,
            OldPrice = command.OldPrice,
            Status = string.IsNullOrWhiteSpace(command.Status) ? "active" : command.Status.Trim().ToLowerInvariant(),
            Badge = command.Badge,
            CreatedAt = DateTime.UtcNow
        };

        await dbContext.AddProductAsync(product, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return CatalogMappings.MapProduct(product, dbContext.Categories.First(x => x.Id == product.CategoryId).Name);
    }
}

public sealed class UpdateProductCommandHandler(ICatalogDbContext dbContext) : ICommandHandler<UpdateProductCommand, ProductDto>
{
    public async Task<ProductDto> Handle(UpdateProductCommand command, CancellationToken cancellationToken)
    {
        var product = dbContext.Products.FirstOrDefault(x => x.Id == command.Id)
            ?? throw new KeyNotFoundException("Product not found.");

        _ = dbContext.Categories.FirstOrDefault(x => x.Id == command.CategoryId)
            ?? throw new KeyNotFoundException("Category not found.");

        product.CategoryId = command.CategoryId;
        product.Name = command.Name.Trim();
        product.Slug = command.Slug.Trim().ToLowerInvariant();
        product.Description = command.Description;
        product.Price = command.Price;
        product.OldPrice = command.OldPrice;
        product.Status = string.IsNullOrWhiteSpace(command.Status) ? product.Status : command.Status.Trim().ToLowerInvariant();
        product.Badge = command.Badge;
        product.UpdatedAt = DateTime.UtcNow;

        await dbContext.SaveChangesAsync(cancellationToken);
        return CatalogMappings.MapProduct(product, dbContext.Categories.First(x => x.Id == product.CategoryId).Name);
    }
}

public sealed class DeleteProductCommandHandler(ICatalogDbContext dbContext) : ICommandHandler<DeleteProductCommand, bool>
{
    public async Task<bool> Handle(DeleteProductCommand command, CancellationToken cancellationToken)
    {
        var product = dbContext.Products.FirstOrDefault(x => x.Id == command.Id)
            ?? throw new KeyNotFoundException("Product not found.");

        dbContext.RemoveProduct(product);
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }
}

public sealed class GetProductByIdQueryHandler(ICatalogDbContext dbContext) : IQueryHandler<GetProductByIdQuery, ProductDto>
{
    public Task<ProductDto> Handle(GetProductByIdQuery query, CancellationToken cancellationToken)
    {
        var product = dbContext.Products.FirstOrDefault(x => x.Id == query.Id)
            ?? throw new KeyNotFoundException("Product not found.");

        var categoryName = dbContext.Categories.First(x => x.Id == product.CategoryId).Name;
        return Task.FromResult(CatalogMappings.MapProduct(product, categoryName));
    }
}

public sealed class GetProductsQueryHandler(ICatalogDbContext dbContext) : IQueryHandler<GetProductsQuery, IReadOnlyList<ProductDto>>
{
    public Task<IReadOnlyList<ProductDto>> Handle(GetProductsQuery query, CancellationToken cancellationToken)
    {
        IReadOnlyList<ProductDto> products = dbContext.Products
            .OrderByDescending(x => x.Id)
            .ToList()
            .Select(product => CatalogMappings.MapProduct(product, dbContext.Categories.First(x => x.Id == product.CategoryId).Name))
            .ToList();

        return Task.FromResult(products);
    }
}

internal static class CatalogMappings
{
    public static ProductDto MapProduct(Product product, string categoryName) => new(
        product.Id,
        product.CategoryId,
        categoryName,
        product.Name,
        product.Slug,
        product.Description,
        product.Price,
        product.OldPrice,
        product.Status,
        product.Badge,
        product.RatingAverage,
        product.ReviewCount,
        product.SoldCount,
        product.Variants.Select(v => new ProductVariantDto(v.Id, v.ProductId, v.ColorId, v.SizeId, v.SKU, v.StockQuantity, v.PriceOverride)).ToList(),
        product.Images.Select(i => new ProductImageDto(i.Id, i.ProductId, i.Url, i.IsThumbnail, i.SortOrder)).ToList());
}
