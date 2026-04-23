using MediatR;
using Services.Auth.Application.Abstractions.Persistence;
using Services.Auth.Application.Features.Addresses.Common;

namespace Services.Auth.Application.Features.Addresses.Queries.GetMyAddresses;

public sealed class GetMyAddressesQueryHandler : IRequestHandler<GetMyAddressesQuery, IReadOnlyCollection<AddressResponse>>
{
    private readonly IAddressRepository _addressRepository;

    public GetMyAddressesQueryHandler(IAddressRepository addressRepository)
    {
        _addressRepository = addressRepository;
    }

    public async Task<IReadOnlyCollection<AddressResponse>> Handle(GetMyAddressesQuery request, CancellationToken cancellationToken)
    {
        var addresses = await _addressRepository.GetByUserIdAsync(request.UserId, cancellationToken);
        return addresses
            .Select(address => new AddressResponse(
                address.Id,
                address.RecipientName,
                address.Phone,
                address.AddressLine,
                address.City,
                address.District,
                address.Ward,
                address.IsDefault))
            .ToArray();
    }
}
