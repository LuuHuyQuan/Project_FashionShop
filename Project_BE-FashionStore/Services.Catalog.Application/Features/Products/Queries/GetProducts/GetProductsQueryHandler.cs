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

        var result = new List<ProductResponse>();

        foreach (var product in products)
        {
            if (!request.IncludeInactive && product.Status != "active")
                continue;

            var images = product.ProductImages?
                .Select(img => new ProductImageResponse(img.Id, img.Url, img.IsThumbnail, img.SortOrder))
                .OrderBy(img => img.SortOrder)
                .ToList() ?? new List<ProductImageResponse>();

            var variants = product.ProductVariants?
                .Select(v => new ProductVariantResponse(
                    v.Id,
                    v.SKU,
                    v.ColorId,
                    v.Color?.Name ?? string.Empty,
                    v.Color?.HexCode ?? string.Empty,
                    v.SizeId,
                    v.Size?.Name ?? string.Empty,
                    v.StockQuantity,
                    v.PriceOverride))
                .ToList() ?? new List<ProductVariantResponse>();

            result.Add(new ProductResponse(
                product.Id,
                product.CategoryId,
                product.Category?.Name ?? string.Empty,
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
                product.UpdatedAt,
                images,
                variants));
        }

        return result.ToArray();
    }
}
