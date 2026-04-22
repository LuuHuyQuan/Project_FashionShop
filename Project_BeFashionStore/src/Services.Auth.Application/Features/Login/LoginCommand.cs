using BuildingBlocks.Application;
using Services.Auth.Application.Abstractions;
using Services.Auth.Application.Contracts;

namespace Services.Auth.Application.Features.Login;

public sealed record LoginCommand(string Email, string Password) : ICommand<AuthResponseDto>;

public sealed class LoginCommandHandler(IAuthDbContext dbContext, IPasswordHasher passwordHasher, IJwtTokenService jwtTokenService)
    : ICommandHandler<LoginCommand, AuthResponseDto>
{
    public Task<AuthResponseDto> Handle(LoginCommand command, CancellationToken cancellationToken)
    {
        var email = command.Email.Trim().ToLowerInvariant();
        var user = dbContext.Users.FirstOrDefault(x => x.Email.ToLower() == email)
            ?? throw new InvalidOperationException("Invalid email or password.");

        if (!passwordHasher.Verify(command.Password, user.PasswordHash))
        {
            throw new InvalidOperationException("Invalid email or password.");
        }

        var response = jwtTokenService.CreateAuthResponse(user);
        return Task.FromResult(response);
    }
}
