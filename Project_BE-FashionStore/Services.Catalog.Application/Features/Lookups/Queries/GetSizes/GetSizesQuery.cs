using MediatR;
using Services.Catalog.Application.Features.Lookups.Common;

namespace Services.Catalog.Application.Features.Lookups.Queries.GetSizes;

public sealed record GetSizesQuery() : IRequest<IReadOnlyCollection<SizeResponse>>;
