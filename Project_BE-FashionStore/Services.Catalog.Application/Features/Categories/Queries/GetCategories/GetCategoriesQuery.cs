using MediatR;
using Services.Catalog.Application.Features.Categories.Common;

namespace Services.Catalog.Application.Features.Categories.Queries.GetCategories;

public record GetCategoriesQuery : IRequest<IEnumerable<CategoryResponse>>;
