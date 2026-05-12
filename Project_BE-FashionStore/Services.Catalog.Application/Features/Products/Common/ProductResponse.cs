namespace Services.Catalog.Application.Features.Products.Common;

public sealed record ProductImageResponse(
    int Id,
    string Url,
    bool IsThumbnail,
    int SortOrder);

public sealed record ProductVariantResponse(
    int Id,
    string SKU,
    int ColorId,
    string ColorName,
    string ColorHexCode,
    int SizeId,
    string SizeName,
    int StockQuantity,
    decimal? PriceOverride);

public sealed record ProductResponse(
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
    DateTime CreatedAt,
    DateTime? UpdatedAt,
    List<ProductImageResponse> Images,
    List<ProductVariantResponse> Variants);

