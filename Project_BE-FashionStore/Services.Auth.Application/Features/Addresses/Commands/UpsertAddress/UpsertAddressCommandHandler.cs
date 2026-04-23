using MediatR;
using Services.Auth.Application.Abstractions.Persistence;
using Services.Auth.Application.Features.Addresses.Common;
using Services.Auth.Domain.Entities;

namespace Services.Auth.Application.Features.Addresses.Commands.UpsertAddress;

public sealed class UpsertAddressCommandHandler : IRequestHandler<UpsertAddressCommand, AddressResponse>
{
    private readonly IAddressRepository _addressRepository;

    public UpsertAddressCommandHandler(IAddressRepository addressRepository)
    {
        _addressRepository = addressRepository;
    }

    public async Task<AddressResponse> Handle(UpsertAddressCommand request, CancellationToken cancellationToken)
    {
        if (request.Id is { } id)
        {
            var address = await _addressRepository.GetByIdAsync(id, cancellationToken)
                ?? throw new KeyNotFoundException("Address not found.");

            _addressRepository.Remove(address);
            await _addressRepository.SaveChangesAsync(cancellationToken);
        }

        var entity = new Address(
            request.UserId,
            request.RecipientName,
            request.Phone,
            request.AddressLine,
            request.City,
            request.District,
            request.Ward,
            request.IsDefault);

        await _addressRepository.AddAsync(entity, cancellationToken);
        await _addressRepository.SaveChangesAsync(cancellationToken);

        return new AddressResponse(
            entity.Id,
            entity.RecipientName,
            entity.Phone,
            entity.AddressLine,
            entity.City,
            entity.District,
            entity.Ward,
            entity.IsDefault);
    }
}
