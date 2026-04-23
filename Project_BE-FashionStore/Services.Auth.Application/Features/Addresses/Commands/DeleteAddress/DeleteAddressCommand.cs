using MediatR;

namespace Services.Auth.Application.Features.Addresses.Commands.DeleteAddress;

public sealed record DeleteAddressCommand(int UserId, int Id) : IRequest<Unit>;
