using MediatR;
using Services.Catalog.Application.Features.Colors.Common;

namespace Services.Catalog.Application.Features.Colors.Queries.GetColors;

public record GetColorsQuery : IRequest<IEnumerable<ColorResponse>>;
