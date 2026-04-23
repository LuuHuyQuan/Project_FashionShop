namespace Services.Catalog.Api.DTOs;

public record CreateProductVariantRequest(
    int ProductId,
    int ColorId,
    int SizeId,
    string SKU,
    int StockQuantity,
    decimal? PriceOverride = null);
