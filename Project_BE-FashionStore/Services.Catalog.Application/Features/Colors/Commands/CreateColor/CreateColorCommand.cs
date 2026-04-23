using MediatR;
using Services.Catalog.Application.Features.Colors.Common;

namespace Services.Catalog.Application.Features.Colors.Commands.CreateColor;

public record CreateColorCommand(
    string Name,
    string HexCode
) : IRequest<ColorResponse>;
