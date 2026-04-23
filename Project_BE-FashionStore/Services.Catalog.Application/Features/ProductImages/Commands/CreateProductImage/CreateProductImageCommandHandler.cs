using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.ProductImages.Common;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Features.ProductImages.Commands.CreateProductImage;

public class CreateProductImageCommandHandler : IRequestHandler<CreateProductImageCommand, ProductImageResponse>
{
    private readonly IProductImageRepository _repository;

    public CreateProductImageCommandHandler(IProductImageRepository repository)
    {
        _repository = repository;
    }

    public async Task<ProductImageResponse> Handle(CreateProductImageCommand request, CancellationToken cancellationToken)
    {
        var image = new ProductImage
        {
            ProductId = request.ProductId,
            Url = request.Url,
            IsThumbnail = request.IsThumbnail,
            SortOrder = request.SortOrder
        };

        var created = await _repository.CreateAsync(image);
        
        return new ProductImageResponse(
            created.Id,
            created.ProductId,
            created.Url,
            created.IsThumbnail,
            created.SortOrder
        );
    }
}
