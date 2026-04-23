using MediatR;
using Services.Catalog.Application.Features.ProductVariants.Common;

namespace Services.Catalog.Application.Features.ProductVariants.Commands.CreateProductVariant;

public record CreateProductVariantCommand(
    int ProductId,
    int ColorId,
    int SizeId,
    string SKU,
    int StockQuantity,
    decimal? PriceOverride
) : IRequest<ProductVariantResponse>;
