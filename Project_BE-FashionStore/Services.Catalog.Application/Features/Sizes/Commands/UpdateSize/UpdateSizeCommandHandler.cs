using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;

namespace Services.Catalog.Application.Features.Sizes.Commands.UpdateSize;

public class UpdateSizeCommandHandler : IRequestHandler<UpdateSizeCommand, bool>
{
    private readonly ISizeRepository _sizeRepository;

    public UpdateSizeCommandHandler(ISizeRepository sizeRepository)
    {
        _sizeRepository = sizeRepository;
    }

    public async Task<bool> Handle(UpdateSizeCommand request, CancellationToken cancellationToken)
    {
        var size = await _sizeRepository.GetByIdAsync(request.Id, cancellationToken);
        
        if (size == null)
            return false;

        size.Name = request.Name;

        await _sizeRepository.UpdateAsync(size, cancellationToken);
        return true;
    }
}
