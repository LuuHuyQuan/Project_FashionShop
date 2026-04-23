using MediatR;
using Services.Catalog.Application.Features.ProductVariants.Common;

namespace Services.Catalog.Application.Features.ProductVariants.Queries.GetProductVariants;

public record GetProductVariantsQuery : IRequest<IEnumerable<ProductVariantResponse>>;
