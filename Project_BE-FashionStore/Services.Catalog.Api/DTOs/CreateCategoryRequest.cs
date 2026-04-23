namespace Services.Catalog.Api.DTOs;

public record CreateCategoryRequest(
    string Name,
    string Slug,
    string? Description,
    string Status = "active");
