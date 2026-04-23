using MediatR;
using Services.Catalog.Application.Features.ProductVariants.Common;

namespace Services.Catalog.Application.Features.ProductVariants.Queries.GetProductVariants;

public class GetProductVariantsQueryHandler : IRequestHandler<GetProductVariantsQuery, IEnumerable<ProductVariantResponse>>
{
    public Task<IEnumerable<ProductVariantResponse>> Handle(GetProductVariantsQuery request, CancellationToken cancellationToken)
    {
        // Return empty list - use GetByProductId instead
        return Task.FromResult(Enumerable.Empty<ProductVariantResponse>());
    }
}
