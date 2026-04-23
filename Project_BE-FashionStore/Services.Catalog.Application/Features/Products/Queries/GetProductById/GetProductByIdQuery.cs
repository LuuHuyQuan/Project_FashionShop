using MediatR;
using Services.Catalog.Application.Features.Products.Common;

namespace Services.Catalog.Application.Features.Products.Queries.GetProductById;

public sealed record GetProductByIdQuery(int Id) : IRequest<ProductResponse>;
