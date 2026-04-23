namespace Services.Catalog.Application.Features.ProductImages.Common;

public record ProductImageResponse(
    int Id,
    int ProductId,
    string Url,
    bool IsThumbnail,
    int SortOrder
);
