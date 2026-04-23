using MediatR;
using Services.Auth.Application.Common.Models;

namespace Services.Auth.Application.Features.Authentication.Commands.RefreshToken;

public sealed record RefreshTokenCommand(string RefreshToken) : IRequest<AuthenticationResult>;
