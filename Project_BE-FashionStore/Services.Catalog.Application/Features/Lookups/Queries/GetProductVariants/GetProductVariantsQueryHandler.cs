using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.Lookups.Common;

namespace Services.Catalog.Application.Features.Lookups.Queries.GetProductVariants;

public sealed class GetProductVariantsQueryHandler : IRequestHandler<GetProductVariantsQuery, IReadOnlyCollection<ProductVariantResponse>>
{
    private readonly ICatalogLookupRepository _lookupRepository;

    public GetProductVariantsQueryHandler(ICatalogLookupRepository lookupRepository)
    {
        _lookupRepository = lookupRepository;
    }

    public async Task<IReadOnlyCollection<ProductVariantResponse>> Handle(GetProductVariantsQuery request, CancellationToken cancellationToken)
    {
        var variants = await _lookupRepository.GetProductVariantsAsync(request.ProductId, cancellationToken);
        return variants
            .Select(x => new ProductVariantResponse(x.Id, x.ProductId, x.ColorId, x.SizeId, x.SKU, x.StockQuantity, x.PriceOverride))
            .ToArray();
    }
}
