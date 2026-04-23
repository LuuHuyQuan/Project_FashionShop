using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;

namespace Services.Catalog.Application.Features.ProductImages.Commands.DeleteProductImage;

public class DeleteProductImageCommandHandler : IRequestHandler<DeleteProductImageCommand, bool>
{
    private readonly IProductImageRepository _repository;

    public DeleteProductImageCommandHandler(IProductImageRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool> Handle(DeleteProductImageCommand request, CancellationToken cancellationToken)
    {
        var image = await _repository.GetByIdAsync(request.Id);
        
        if (image == null)
            return false;

        await _repository.DeleteAsync(request.Id);
        return true;
    }
}
