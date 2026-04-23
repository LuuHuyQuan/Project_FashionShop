namespace Services.Catalog.Application.Features.ProductVariants.Common;

public record ProductVariantResponse(
    int Id,
    int ProductId,
    int ColorId,
    int SizeId,
    string SKU,
    int StockQuantity,
    decimal? PriceOverride
);
