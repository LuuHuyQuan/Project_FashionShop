using MediatR;
using Services.Auth.Application.Features.Addresses.Common;

namespace Services.Auth.Application.Features.Addresses.Queries.GetMyAddresses;

public sealed record GetMyAddressesQuery(int UserId) : IRequest<IReadOnlyCollection<AddressResponse>>;
