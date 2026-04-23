using MediatR;

namespace Services.Catalog.Application.Features.ProductVariants.Commands.UpdateProductVariant;

public record UpdateProductVariantCommand(
    int Id,
    int ProductId,
    int ColorId,
    int SizeId,
    string SKU,
    int StockQuantity,
    decimal? PriceOverride
) : IRequest<bool>;
