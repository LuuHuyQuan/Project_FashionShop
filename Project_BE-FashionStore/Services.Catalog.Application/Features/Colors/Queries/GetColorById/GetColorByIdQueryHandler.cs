using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.Colors.Common;

namespace Services.Catalog.Application.Features.Colors.Queries.GetColorById;

public class GetColorByIdQueryHandler : IRequestHandler<GetColorByIdQuery, ColorResponse?>
{
    private readonly IColorRepository _colorRepository;

    public GetColorByIdQueryHandler(IColorRepository colorRepository)
    {
        _colorRepository = colorRepository;
    }

    public async Task<ColorResponse?> Handle(GetColorByIdQuery request, CancellationToken cancellationToken)
    {
        var color = await _colorRepository.GetByIdAsync(request.Id, cancellationToken);
        
        if (color == null)
            return null;
        
        return new ColorResponse(color.Id, color.Name, color.HexCode);
    }
}
