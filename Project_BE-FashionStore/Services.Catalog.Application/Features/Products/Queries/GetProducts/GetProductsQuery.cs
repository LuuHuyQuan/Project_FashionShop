using MediatR;
using Services.Catalog.Application.Features.Products.Common;

namespace Services.Catalog.Application.Features.Products.Queries.GetProducts;

public sealed record GetProductsQuery(bool IncludeInactive = false) : IRequest<IReadOnlyCollection<ProductResponse>>;
