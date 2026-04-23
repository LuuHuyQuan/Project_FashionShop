using MediatR;
using Services.Catalog.Application.Features.ProductImages.Common;

namespace Services.Catalog.Application.Features.ProductImages.Queries.GetProductImageById;

public record GetProductImageByIdQuery(int Id) : IRequest<ProductImageResponse?>;
