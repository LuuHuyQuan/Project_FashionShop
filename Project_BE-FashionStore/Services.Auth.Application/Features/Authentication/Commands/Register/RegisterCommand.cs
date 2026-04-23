using MediatR;
using Services.Auth.Application.Features.Authentication.Common;

namespace Services.Auth.Application.Features.Authentication.Commands.Register;

public record RegisterCommand(
    string FullName,
    string Email,
    string Phone,
    string Password
) : IRequest<AuthResponse>;
