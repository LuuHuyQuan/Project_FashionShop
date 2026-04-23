using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.Products.Common;

namespace Services.Catalog.Application.Features.Products.Queries.GetProducts;

public sealed class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, IReadOnlyCollection<ProductResponse>>
{
    private readonly IProductRepository _productRepository;

    public GetProductsQueryHandler(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<IReadOnlyCollection<ProductResponse>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await _productRepository.GetAllAsync(cancellationToken);

        return products
            .Where(product => request.IncludeInactive || product.IsActive)
            .Select(product => new ProductResponse(
                product.Id,
                product.CategoryId,
                product.Name,
                product.Slug,
                product.Description,
                product.Price,
                product.OldPrice,
                product.Status,
                product.Badge,
                product.RatingAverage,
                product.ReviewCount,
                product.SoldCount,
                product.IsActive,
                product.CreatedAt,
                product.UpdatedAt))
            .ToArray();
    }
}
