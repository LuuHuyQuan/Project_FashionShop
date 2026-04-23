using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.Sizes.Common;

namespace Services.Catalog.Application.Features.Sizes.Queries.GetSizes;

public class GetSizesQueryHandler : IRequestHandler<GetSizesQuery, IEnumerable<SizeResponse>>
{
    private readonly ISizeRepository _sizeRepository;

    public GetSizesQueryHandler(ISizeRepository sizeRepository)
    {
        _sizeRepository = sizeRepository;
    }

    public async Task<IEnumerable<SizeResponse>> Handle(GetSizesQuery request, CancellationToken cancellationToken)
    {
        var sizes = await _sizeRepository.GetAllAsync(cancellationToken);
        
        return sizes.Select(s => new SizeResponse(s.Id, s.Name));
    }
}
