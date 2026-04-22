namespace Services.Catalog.Application.Contracts;

public sealed record CategoryDto(int Id, string Name, string Slug, string? Description, string Status);

public sealed record ProductVariantDto(int Id, int ProductId, int ColorId, int SizeId, string Sku, int StockQuantity, decimal? PriceOverride);

public sealed record ProductImageDto(int Id, int ProductId, string Url, bool IsThumbnail, int SortOrder);

public sealed record ProductDto(
    int Id,
    int CategoryId,
    string CategoryName,
    string Name,
    string Slug,
    string? Description,
    decimal Price,
    decimal? OldPrice,
    string Status,
    string? Badge,
    decimal RatingAverage,
    int ReviewCount,
    int SoldCount,
    IEnumerable<ProductVariantDto> Variants,
    IEnumerable<ProductImageDto> Images);
