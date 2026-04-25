using MediatR;
using Services.Catalog.Application.Features.Categories.Common;

namespace Services.Catalog.Application.Features.Categories.Commands.CreateCategory;

public record CreateCategoryCommand(
    string Name,
    string Slug,
    string? Description,
    string? Image,
    string Status
) : IRequest<CategoryResponse>;
