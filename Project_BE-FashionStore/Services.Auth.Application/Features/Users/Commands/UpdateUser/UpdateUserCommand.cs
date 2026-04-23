using MediatR;

namespace Services.Auth.Application.Features.Users.Commands.UpdateUser;

public sealed record UpdateUserCommand(
    int Id,
    string FullName,
    string Phone,
    string Role,
    string Status) : IRequest<Unit>;
