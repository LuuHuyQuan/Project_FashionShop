using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.Products.Common;

namespace Services.Catalog.Application.Features.Products.Queries.GetProductById;

public sealed class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, ProductResponse>
{
    private readonly IProductRepository _productRepository;

    public GetProductByIdQueryHandler(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<ProductResponse> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await _productRepository.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new KeyNotFoundException($"Product {request.Id} was not found.");

        return new ProductResponse(
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
            product.CreatedAt,
            product.UpdatedAt);
    }
}
