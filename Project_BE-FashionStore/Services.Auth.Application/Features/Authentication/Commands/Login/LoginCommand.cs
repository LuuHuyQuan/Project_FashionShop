using MediatR;
using Services.Auth.Application.Features.Authentication.Common;

namespace Services.Auth.Application.Features.Authentication.Commands.Login;

public record LoginCommand(
    string Email,
    string Password
) : IRequest<AuthResponse>;
