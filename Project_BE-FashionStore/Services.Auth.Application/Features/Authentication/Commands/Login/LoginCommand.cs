using MediatR;
using Services.Auth.Application.Common.Models;

namespace Services.Auth.Application.Features.Authentication.Commands.Login;

public sealed record LoginCommand(string Email, string Password) : IRequest<AuthenticationResult>;
