using MediatR;
using Services.Auth.Application.Features.Authentication.Common;

namespace Services.Auth.Application.Features.Authentication.Commands.RefreshToken;

public record RefreshTokenCommand(string RefreshToken) : IRequest<AuthResponse>;
