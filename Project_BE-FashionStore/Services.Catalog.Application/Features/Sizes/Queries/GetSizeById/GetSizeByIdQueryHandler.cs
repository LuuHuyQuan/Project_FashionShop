using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.Sizes.Common;

namespace Services.Catalog.Application.Features.Sizes.Queries.GetSizeById;

public class GetSizeByIdQueryHandler : IRequestHandler<GetSizeByIdQuery, SizeResponse?>
{
    private readonly ISizeRepository _sizeRepository;

    public GetSizeByIdQueryHandler(ISizeRepository sizeRepository)
    {
        _sizeRepository = sizeRepository;
    }

    public async Task<SizeResponse?> Handle(GetSizeByIdQuery request, CancellationToken cancellationToken)
    {
        var size = await _sizeRepository.GetByIdAsync(request.Id, cancellationToken);
        
        if (size == null)
            return null;
        
        return new SizeResponse(size.Id, size.Name);
    }
}
