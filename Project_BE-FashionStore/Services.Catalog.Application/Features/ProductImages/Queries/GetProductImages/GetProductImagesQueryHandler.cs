using MediatR;
using Services.Catalog.Application.Features.ProductImages.Common;

namespace Services.Catalog.Application.Features.ProductImages.Queries.GetProductImages;

public class GetProductImagesQueryHandler : IRequestHandler<GetProductImagesQuery, IEnumerable<ProductImageResponse>>
{
    public Task<IEnumerable<ProductImageResponse>> Handle(GetProductImagesQuery request, CancellationToken cancellationToken)
    {
        // Return empty list - use GetByProductId instead
        return Task.FromResult(Enumerable.Empty<ProductImageResponse>());
    }
}
