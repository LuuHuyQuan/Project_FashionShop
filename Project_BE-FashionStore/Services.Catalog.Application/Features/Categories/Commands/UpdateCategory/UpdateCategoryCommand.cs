using MediatR;

namespace Services.Catalog.Application.Features.Categories.Commands.UpdateCategory;

public record UpdateCategoryCommand(
    int Id,
    string Name,
    string Slug,
    string? Description,
    string Status
) : IRequest<bool>;
