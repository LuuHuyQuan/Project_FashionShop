using MediatR;
using Services.Catalog.Application.Features.Lookups.Common;

namespace Services.Catalog.Application.Features.Lookups.Queries.GetProductImages;

public sealed record GetProductImagesQuery(int ProductId) : IRequest<IReadOnlyCollection<ProductImageResponse>>;
