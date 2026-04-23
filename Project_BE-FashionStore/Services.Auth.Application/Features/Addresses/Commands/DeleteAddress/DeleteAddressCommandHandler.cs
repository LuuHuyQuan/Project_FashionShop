using MediatR;
using Services.Auth.Application.Abstractions.Persistence;

namespace Services.Auth.Application.Features.Addresses.Commands.DeleteAddress;

public sealed class DeleteAddressCommandHandler : IRequestHandler<DeleteAddressCommand, Unit>
{
    private readonly IAddressRepository _addressRepository;

    public DeleteAddressCommandHandler(IAddressRepository addressRepository)
    {
        _addressRepository = addressRepository;
    }

    public async Task<Unit> Handle(DeleteAddressCommand request, CancellationToken cancellationToken)
    {
        var address = await _addressRepository.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new KeyNotFoundException("Address not found.");

        _addressRepository.Remove(address);
        await _addressRepository.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
