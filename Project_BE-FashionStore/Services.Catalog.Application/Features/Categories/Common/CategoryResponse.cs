namespace Services.Catalog.Application.Features.Categories.Common;

public record CategoryResponse(
    int Id,
    string Name,
    string Slug,
    string? Description,
    string Status
);
