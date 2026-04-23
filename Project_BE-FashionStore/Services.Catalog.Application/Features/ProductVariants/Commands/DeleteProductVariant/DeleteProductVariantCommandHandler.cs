using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;

namespace Services.Catalog.Application.Features.ProductVariants.Commands.DeleteProductVariant;

public class DeleteProductVariantCommandHandler : IRequestHandler<DeleteProductVariantCommand, bool>
{
    private readonly IProductVariantRepository _repository;

    public DeleteProductVariantCommandHandler(IProductVariantRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool> Handle(DeleteProductVariantCommand request, CancellationToken cancellationToken)
    {
        var variant = await _repository.GetByIdAsync(request.Id);
        
        if (variant == null)
            return false;

        await _repository.DeleteAsync(request.Id);
        return true;
    }
}
