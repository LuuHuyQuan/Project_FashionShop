namespace Services.Catalog.Application.Features.Products.Common;

public sealed record ProductResponse(
    int Id,
    int CategoryId,
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
    bool IsActive,
    DateTime CreatedAt,
    DateTime? UpdatedAt);
