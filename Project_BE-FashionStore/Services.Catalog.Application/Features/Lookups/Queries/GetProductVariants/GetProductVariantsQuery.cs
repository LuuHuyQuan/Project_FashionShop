using MediatR;
using Services.Catalog.Application.Features.Lookups.Common;

namespace Services.Catalog.Application.Features.Lookups.Queries.GetProductVariants;

public sealed record GetProductVariantsQuery(int ProductId) : IRequest<IReadOnlyCollection<ProductVariantResponse>>;
