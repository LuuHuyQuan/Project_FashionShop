using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;

namespace Services.Catalog.Application.Features.Sizes.Commands.DeleteSize;

public class DeleteSizeCommandHandler : IRequestHandler<DeleteSizeCommand, bool>
{
    private readonly ISizeRepository _sizeRepository;

    public DeleteSizeCommandHandler(ISizeRepository sizeRepository)
    {
        _sizeRepository = sizeRepository;
    }

    public async Task<bool> Handle(DeleteSizeCommand request, CancellationToken cancellationToken)
    {
        var size = await _sizeRepository.GetByIdAsync(request.Id, cancellationToken);
        
        if (size == null)
            return false;

        await _sizeRepository.DeleteAsync(request.Id, cancellationToken);
        return true;
    }
}
