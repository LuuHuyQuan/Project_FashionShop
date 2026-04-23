using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.ProductVariants.Common;

namespace Services.Catalog.Application.Features.ProductVariants.Queries.GetProductVariantById;

public class GetProductVariantByIdQueryHandler : IRequestHandler<GetProductVariantByIdQuery, ProductVariantResponse?>
{
    private readonly IProductVariantRepository _repository;

    public GetProductVariantByIdQueryHandler(IProductVariantRepository repository)
    {
        _repository = repository;
    }

    public async Task<ProductVariantResponse?> Handle(GetProductVariantByIdQuery request, CancellationToken cancellationToken)
    {
        var variant = await _repository.GetByIdAsync(request.Id);
        
        if (variant == null)
            return null;
        
        return new ProductVariantResponse(
            variant.Id,
            variant.ProductId,
            variant.ColorId,
            variant.SizeId,
            variant.SKU,
            variant.StockQuantity,
            variant.PriceOverride
        );
    }
}
