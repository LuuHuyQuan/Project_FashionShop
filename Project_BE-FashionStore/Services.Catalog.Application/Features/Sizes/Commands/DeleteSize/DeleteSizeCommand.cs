using MediatR;

namespace Services.Catalog.Application.Features.Sizes.Commands.DeleteSize;

public record DeleteSizeCommand(int Id) : IRequest<bool>;
