using MediatR;
using Services.Catalog.Application.Features.Lookups.Common;

namespace Services.Catalog.Application.Features.Lookups.Queries.GetColors;

public sealed record GetColorsQuery() : IRequest<IReadOnlyCollection<ColorResponse>>;
