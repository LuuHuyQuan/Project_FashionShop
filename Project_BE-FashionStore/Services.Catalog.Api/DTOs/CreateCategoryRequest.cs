namespace Services.Catalog.Api.DTOs;

public record CreateCategoryRequest(
    string Name,
    string Slug,
    string? Description,
    string? Image,
    string Status = "active");
