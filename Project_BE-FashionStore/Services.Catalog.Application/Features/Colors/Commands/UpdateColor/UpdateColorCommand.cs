using MediatR;

namespace Services.Catalog.Application.Features.Colors.Commands.UpdateColor;

public record UpdateColorCommand(
    int Id,
    string Name,
    string HexCode
) : IRequest<bool>;
