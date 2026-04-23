namespace Services.Catalog.Api.DTOs;

public record CreateProductImageRequest(
    int ProductId,
    string Url,
    bool IsThumbnail = false,
    int SortOrder = 0);
