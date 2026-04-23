using MediatR;
using Services.Catalog.Application.Features.Categories.Common;

namespace Services.Catalog.Application.Features.Categories.Queries.GetCategoryById;

public record GetCategoryByIdQuery(int Id) : IRequest<CategoryResponse?>;
