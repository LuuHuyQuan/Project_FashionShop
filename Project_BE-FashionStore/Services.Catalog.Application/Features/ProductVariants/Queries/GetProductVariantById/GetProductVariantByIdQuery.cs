using MediatR;
using Services.Catalog.Application.Features.ProductVariants.Common;

namespace Services.Catalog.Application.Features.ProductVariants.Queries.GetProductVariantById;

public record GetProductVariantByIdQuery(int Id) : IRequest<ProductVariantResponse?>;
