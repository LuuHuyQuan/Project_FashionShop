using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;

namespace Services.Catalog.Application.Features.Colors.Commands.DeleteColor;

public class DeleteColorCommandHandler : IRequestHandler<DeleteColorCommand, bool>
{
    private readonly IColorRepository _colorRepository;

    public DeleteColorCommandHandler(IColorRepository colorRepository)
    {
        _colorRepository = colorRepository;
    }

    public async Task<bool> Handle(DeleteColorCommand request, CancellationToken cancellationToken)
    {
        var color = await _colorRepository.GetByIdAsync(request.Id, cancellationToken);
        
        if (color == null)
            return false;

        await _colorRepository.DeleteAsync(request.Id, cancellationToken);
        return true;
    }
}
