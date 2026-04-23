using MediatR;

namespace Services.Catalog.Application.Features.Colors.Commands.DeleteColor;

public record DeleteColorCommand(int Id) : IRequest<bool>;
