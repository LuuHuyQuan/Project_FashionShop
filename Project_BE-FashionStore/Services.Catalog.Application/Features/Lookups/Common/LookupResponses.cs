namespace Services.Catalog.Application.Features.Lookups.Common;

public sealed record ProductImageResponse(int Id, int ProductId, string Url, bool IsThumbnail, int SortOrder);
public sealed record ProductVariantResponse(int Id, int ProductId, int ColorId, int SizeId, string SKU, int StockQuantity, decimal? PriceOverride);
public sealed record ColorResponse(int Id, string Name, string HexCode);
public sealed record SizeResponse(int Id, string Name);
public sealed record ReviewResponse(int Id, int UserId, int ProductId, int Rating, string? Comment, DateTime CreatedAt);
