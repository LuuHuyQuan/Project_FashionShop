using MediatR;
using Services.Auth.Application.Common.Models;

namespace Services.Auth.Application.Features.Authentication.Commands.Register;

public sealed record RegisterCommand(
    string FullName,
    string Email,
    string Phone,
    string Password,
    string Role = "customer") : IRequest<AuthenticationResult>;
