using MediatR;

namespace Services.Catalog.Application.Features.ProductVariants.Commands.DeleteProductVariant;

public record DeleteProductVariantCommand(int Id) : IRequest<bool>;
