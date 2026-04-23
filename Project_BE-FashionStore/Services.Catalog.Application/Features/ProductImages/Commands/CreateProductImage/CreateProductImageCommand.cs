using MediatR;
using Services.Catalog.Application.Features.ProductImages.Common;

namespace Services.Catalog.Application.Features.ProductImages.Commands.CreateProductImage;

public record CreateProductImageCommand(
    int ProductId,
    string Url,
    bool IsThumbnail,
    int SortOrder
) : IRequest<ProductImageResponse>;
