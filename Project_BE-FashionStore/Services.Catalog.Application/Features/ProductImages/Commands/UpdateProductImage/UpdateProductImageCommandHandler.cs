using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;

namespace Services.Catalog.Application.Features.ProductImages.Commands.UpdateProductImage;

public class UpdateProductImageCommandHandler : IRequestHandler<UpdateProductImageCommand, bool>
{
    private readonly IProductImageRepository _repository;

    public UpdateProductImageCommandHandler(IProductImageRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool> Handle(UpdateProductImageCommand request, CancellationToken cancellationToken)
    {
        var image = await _repository.GetByIdAsync(request.Id);
        
        if (image == null)
            return false;

        image.ProductId = request.ProductId;
        image.Url = request.Url;
        image.IsThumbnail = request.IsThumbnail;
        image.SortOrder = request.SortOrder;

        await _repository.UpdateAsync(image);
        return true;
    }
}
