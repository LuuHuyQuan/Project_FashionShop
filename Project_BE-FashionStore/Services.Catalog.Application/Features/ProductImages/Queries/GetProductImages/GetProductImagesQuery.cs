using MediatR;
using Services.Catalog.Application.Features.ProductImages.Common;

namespace Services.Catalog.Application.Features.ProductImages.Queries.GetProductImages;

public record GetProductImagesQuery : IRequest<IEnumerable<ProductImageResponse>>;
