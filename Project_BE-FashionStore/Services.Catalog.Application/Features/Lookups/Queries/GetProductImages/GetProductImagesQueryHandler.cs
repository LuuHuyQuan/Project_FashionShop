using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.Lookups.Common;

namespace Services.Catalog.Application.Features.Lookups.Queries.GetProductImages;

public sealed class GetProductImagesQueryHandler : IRequestHandler<GetProductImagesQuery, IReadOnlyCollection<ProductImageResponse>>
{
    private readonly ICatalogLookupRepository _lookupRepository;

    public GetProductImagesQueryHandler(ICatalogLookupRepository lookupRepository)
    {
        _lookupRepository = lookupRepository;
    }

    public async Task<IReadOnlyCollection<ProductImageResponse>> Handle(GetProductImagesQuery request, CancellationToken cancellationToken)
    {
        var images = await _lookupRepository.GetProductImagesAsync(request.ProductId, cancellationToken);
        return images
            .Select(x => new ProductImageResponse(x.Id, x.ProductId, x.Url, x.IsThumbnail, x.SortOrder))
            .ToArray();
    }
}
