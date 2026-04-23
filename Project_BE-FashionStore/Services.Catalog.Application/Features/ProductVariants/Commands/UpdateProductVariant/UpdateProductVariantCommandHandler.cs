using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;

namespace Services.Catalog.Application.Features.ProductVariants.Commands.UpdateProductVariant;

public class UpdateProductVariantCommandHandler : IRequestHandler<UpdateProductVariantCommand, bool>
{
    private readonly IProductVariantRepository _repository;

    public UpdateProductVariantCommandHandler(IProductVariantRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool> Handle(UpdateProductVariantCommand request, CancellationToken cancellationToken)
    {
        var variant = await _repository.GetByIdAsync(request.Id);
        
        if (variant == null)
            return false;

        variant.ProductId = request.ProductId;
        variant.ColorId = request.ColorId;
        variant.SizeId = request.SizeId;
        variant.SKU = request.SKU;
        variant.StockQuantity = request.StockQuantity;
        variant.PriceOverride = request.PriceOverride;

        await _repository.UpdateAsync(variant);
        return true;
    }
}
