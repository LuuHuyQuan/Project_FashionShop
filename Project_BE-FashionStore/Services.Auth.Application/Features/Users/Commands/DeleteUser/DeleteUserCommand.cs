using MediatR;

namespace Services.Auth.Application.Features.Users.Commands.DeleteUser;

public sealed record DeleteUserCommand(int Id) : IRequest<Unit>;
