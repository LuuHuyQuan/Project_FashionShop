using MediatR;

namespace Services.Catalog.Application.Features.Sizes.Commands.UpdateSize;

public record UpdateSizeCommand(int Id, string Name) : IRequest<bool>;
