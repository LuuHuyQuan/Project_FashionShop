using MediatR;
using Services.Catalog.Application.Features.Sizes.Common;

namespace Services.Catalog.Application.Features.Sizes.Commands.CreateSize;

public record CreateSizeCommand(string Name) : IRequest<SizeResponse>;
