using BuildingBlocks.Application;
using Services.Catalog.Application.Abstractions;
using Services.Catalog.Application.Contracts;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Features.Variants;

public sealed record CreateProductVariantCommand(int ProductId, int ColorId, int SizeId, string Sku, int StockQuantity, decimal? PriceOverride) : ICommand<ProductVariantDto>;
public sealed record UpdateProductVariantCommand(int Id, int ProductId, int ColorId, int SizeId, string Sku, int StockQuantity, decimal? PriceOverride) : ICommand<ProductVariantDto>;
public sealed record DeleteProductVariantCommand(int Id) : ICommand<bool>;
public sealed record GetProductVariantsQuery(int ProductId) : IQuery<IReadOnlyList<ProductVariantDto>>;

public sealed class CreateProductVariantCommandHandler(ICatalogDbContext dbContext) : ICommandHandler<CreateProductVariantCommand, ProductVariantDto>
{
    public async Task<ProductVariantDto> Handle(CreateProductVariantCommand command, CancellationToken cancellationToken)
    {
        _ = dbContext.Products.FirstOrDefault(x => x.Id == command.ProductId)
            ?? throw new KeyNotFoundException("Product not found.");

        var variant = new ProductVariant
        {
            ProductId = command.ProductId,
            ColorId = command.ColorId,
            SizeId = command.SizeId,
            SKU = command.Sku.Trim(),
            StockQuantity = command.StockQuantity,
            PriceOverride = command.PriceOverride
        };

        await dbContext.AddProductVariantAsync(variant, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return new ProductVariantDto(variant.Id, variant.ProductId, variant.ColorId, variant.SizeId, variant.SKU, variant.StockQuantity, variant.PriceOverride);
    }
}

public sealed class UpdateProductVariantCommandHandler(ICatalogDbContext dbContext) : ICommandHandler<UpdateProductVariantCommand, ProductVariantDto>
{
    public async Task<ProductVariantDto> Handle(UpdateProductVariantCommand command, CancellationToken cancellationToken)
    {
        var variant = dbContext.ProductVariants.FirstOrDefault(x => x.Id == command.Id)
            ?? throw new KeyNotFoundException("Variant not found.");

        variant.ProductId = command.ProductId;
        variant.ColorId = command.ColorId;
        variant.SizeId = command.SizeId;
        variant.SKU = command.Sku.Trim();
        variant.StockQuantity = command.StockQuantity;
        variant.PriceOverride = command.PriceOverride;

        await dbContext.SaveChangesAsync(cancellationToken);
        return new ProductVariantDto(variant.Id, variant.ProductId, variant.ColorId, variant.SizeId, variant.SKU, variant.StockQuantity, variant.PriceOverride);
    }
}

public sealed class DeleteProductVariantCommandHandler(ICatalogDbContext dbContext) : ICommandHandler<DeleteProductVariantCommand, bool>
{
    public async Task<bool> Handle(DeleteProductVariantCommand command, CancellationToken cancellationToken)
    {
        var variant = dbContext.ProductVariants.FirstOrDefault(x => x.Id == command.Id)
            ?? throw new KeyNotFoundException("Variant not found.");

        dbContext.RemoveProductVariant(variant);
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }
}

public sealed class GetProductVariantsQueryHandler(ICatalogDbContext dbContext) : IQueryHandler<GetProductVariantsQuery, IReadOnlyList<ProductVariantDto>>
{
    public Task<IReadOnlyList<ProductVariantDto>> Handle(GetProductVariantsQuery query, CancellationToken cancellationToken)
    {
        IReadOnlyList<ProductVariantDto> items = dbContext.ProductVariants
            .Where(x => x.ProductId == query.ProductId)
            .OrderBy(x => x.Id)
            .Select(x => new ProductVariantDto(x.Id, x.ProductId, x.ColorId, x.SizeId, x.SKU, x.StockQuantity, x.PriceOverride))
            .ToList();

        return Task.FromResult(items);
    }
}
