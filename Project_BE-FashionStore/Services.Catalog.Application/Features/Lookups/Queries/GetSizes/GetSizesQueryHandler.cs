using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.Lookups.Common;

namespace Services.Catalog.Application.Features.Lookups.Queries.GetSizes;

public sealed class GetSizesQueryHandler : IRequestHandler<GetSizesQuery, IReadOnlyCollection<SizeResponse>>
{
    private readonly ICatalogLookupRepository _lookupRepository;

    public GetSizesQueryHandler(ICatalogLookupRepository lookupRepository)
    {
        _lookupRepository = lookupRepository;
    }

    public async Task<IReadOnlyCollection<SizeResponse>> Handle(GetSizesQuery request, CancellationToken cancellationToken)
    {
        var sizes = await _lookupRepository.GetSizesAsync(cancellationToken);
        return sizes.Select(x => new SizeResponse(x.Id, x.Name)).ToArray();
    }
}
