using MediatR;
using Services.Catalog.Application.Features.Sizes.Common;

namespace Services.Catalog.Application.Features.Sizes.Queries.GetSizes;

public record GetSizesQuery : IRequest<IEnumerable<SizeResponse>>;
