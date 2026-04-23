using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.Colors.Common;

namespace Services.Catalog.Application.Features.Colors.Queries.GetColors;

public class GetColorsQueryHandler : IRequestHandler<GetColorsQuery, IEnumerable<ColorResponse>>
{
    private readonly IColorRepository _colorRepository;

    public GetColorsQueryHandler(IColorRepository colorRepository)
    {
        _colorRepository = colorRepository;
    }

    public async Task<IEnumerable<ColorResponse>> Handle(GetColorsQuery request, CancellationToken cancellationToken)
    {
        var colors = await _colorRepository.GetAllAsync(cancellationToken);
        
        return colors.Select(c => new ColorResponse(c.Id, c.Name, c.HexCode));
    }
}
