using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.ProductImages.Common;

namespace Services.Catalog.Application.Features.ProductImages.Queries.GetProductImageById;

public class GetProductImageByIdQueryHandler : IRequestHandler<GetProductImageByIdQuery, ProductImageResponse?>
{
    private readonly IProductImageRepository _repository;

    public GetProductImageByIdQueryHandler(IProductImageRepository repository)
    {
        _repository = repository;
    }

    public async Task<ProductImageResponse?> Handle(GetProductImageByIdQuery request, CancellationToken cancellationToken)
    {
        var image = await _repository.GetByIdAsync(request.Id);
        
        if (image == null)
            return null;
        
        return new ProductImageResponse(
            image.Id,
            image.ProductId,
            image.Url,
            image.IsThumbnail,
            image.SortOrder
        );
    }
}
