using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.Lookups.Common;

namespace Services.Catalog.Application.Features.Lookups.Queries.GetColors;

public sealed class GetColorsQueryHandler : IRequestHandler<GetColorsQuery, IReadOnlyCollection<ColorResponse>>
{
    private readonly ICatalogLookupRepository _lookupRepository;

    public GetColorsQueryHandler(ICatalogLookupRepository lookupRepository)
    {
        _lookupRepository = lookupRepository;
    }

    public async Task<IReadOnlyCollection<ColorResponse>> Handle(GetColorsQuery request, CancellationToken cancellationToken)
    {
        var colors = await _lookupRepository.GetColorsAsync(cancellationToken);
        return colors.Select(x => new ColorResponse(x.Id, x.Name, x.HexCode)).ToArray();
    }
}
