using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;

namespace Services.Catalog.Application.Features.Colors.Commands.UpdateColor;

public class UpdateColorCommandHandler : IRequestHandler<UpdateColorCommand, bool>
{
    private readonly IColorRepository _colorRepository;

    public UpdateColorCommandHandler(IColorRepository colorRepository)
    {
        _colorRepository = colorRepository;
    }

    public async Task<bool> Handle(UpdateColorCommand request, CancellationToken cancellationToken)
    {
        var color = await _colorRepository.GetByIdAsync(request.Id, cancellationToken);
        
        if (color == null)
            return false;

        color.Name = request.Name;
        color.HexCode = request.HexCode;

        await _colorRepository.UpdateAsync(color, cancellationToken);
        return true;
    }
}
