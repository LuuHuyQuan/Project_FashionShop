using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.ProductVariants.Common;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Features.ProductVariants.Commands.CreateProductVariant;

public class CreateProductVariantCommandHandler : IRequestHandler<CreateProductVariantCommand, ProductVariantResponse>
{
    private readonly IProductVariantRepository _repository;

    public CreateProductVariantCommandHandler(IProductVariantRepository repository)
    {
        _repository = repository;
    }

    public async Task<ProductVariantResponse> Handle(CreateProductVariantCommand request, CancellationToken cancellationToken)
    {
        var variant = new ProductVariant
        {
            ProductId = request.ProductId,
            ColorId = request.ColorId,
            SizeId = request.SizeId,
            SKU = request.SKU,
            StockQuantity = request.StockQuantity,
            PriceOverride = request.PriceOverride
        };

        var created = await _repository.CreateAsync(variant);
        
        return new ProductVariantResponse(
            created.Id,
            created.ProductId,
            created.ColorId,
            created.SizeId,
            created.SKU,
            created.StockQuantity,
            created.PriceOverride
        );
    }
}
