using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.Products.Common;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Features.Products.Commands.UpsertProduct;

public sealed class UpsertProductCommandHandler : IRequestHandler<UpsertProductCommand, ProductResponse>
{
    private readonly IProductRepository _productRepository;

    public UpsertProductCommandHandler(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<ProductResponse> Handle(UpsertProductCommand request, CancellationToken cancellationToken)
    {
        Product product;

        if (request.Id is { } id)
        {
            product = await _productRepository.GetByIdAsync(id, cancellationToken)
                ?? throw new KeyNotFoundException($"Product {id} was not found.");

            product.Update(
                request.CategoryId,
                request.Name,
                request.Slug,
                request.Price,
                request.Status,
                request.Description,
                request.OldPrice,
                request.Badge);

            await _productRepository.UpdateAsync(product, cancellationToken);
        }
        else
        {
            var existing = await _productRepository.GetBySlugAsync(request.Slug, cancellationToken);
            if (existing is not null)
            {
                throw new InvalidOperationException($"Product slug '{request.Slug}' already exists.");
            }

            product = new Product(
                0,
                request.CategoryId,
                request.Name,
                request.Slug,
                request.Price,
                request.Status,
                request.Description,
                request.OldPrice,
                request.Badge);

            await _productRepository.AddAsync(product, cancellationToken);
        }

        return new ProductResponse(
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
            new List<ProductImageResponse>(),
            new List<ProductVariantResponse>());
    }
}
