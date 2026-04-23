using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.Colors.Common;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Features.Colors.Commands.CreateColor;

public class CreateColorCommandHandler : IRequestHandler<CreateColorCommand, ColorResponse>
{
    private readonly IColorRepository _colorRepository;

    public CreateColorCommandHandler(IColorRepository colorRepository)
    {
        _colorRepository = colorRepository;
    }

    public async Task<ColorResponse> Handle(CreateColorCommand request, CancellationToken cancellationToken)
    {
        var color = new Color
        {
            Name = request.Name,
            HexCode = request.HexCode
        };

        var created = await _colorRepository.AddAsync(color, cancellationToken);
        
        return new ColorResponse(created.Id, created.Name, created.HexCode);
    }
}
