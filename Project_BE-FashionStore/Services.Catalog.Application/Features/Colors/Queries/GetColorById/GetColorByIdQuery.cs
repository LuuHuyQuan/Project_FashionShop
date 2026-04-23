using MediatR;
using Services.Catalog.Application.Features.Colors.Common;

namespace Services.Catalog.Application.Features.Colors.Queries.GetColorById;

public record GetColorByIdQuery(int Id) : IRequest<ColorResponse?>;
