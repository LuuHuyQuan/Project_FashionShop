using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.Sizes.Common;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Features.Sizes.Commands.CreateSize;

public class CreateSizeCommandHandler : IRequestHandler<CreateSizeCommand, SizeResponse>
{
    private readonly ISizeRepository _sizeRepository;

    public CreateSizeCommandHandler(ISizeRepository sizeRepository)
    {
        _sizeRepository = sizeRepository;
    }

    public async Task<SizeResponse> Handle(CreateSizeCommand request, CancellationToken cancellationToken)
    {
        var size = new Size
        {
            Name = request.Name
        };

        var created = await _sizeRepository.AddAsync(size, cancellationToken);
        
        return new SizeResponse(created.Id, created.Name);
    }
}
