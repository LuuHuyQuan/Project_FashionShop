using BuildingBlocks.Application;
using Services.Auth.Application.Abstractions;
using Services.Auth.Application.Contracts;
using Services.Auth.Domain.Entities;

namespace Services.Auth.Application.Features.Register;

public sealed record RegisterCommand(
    string FullName,
    string Email,
    string Phone,
    string Password) : ICommand<AuthResponseDto>;

public sealed class RegisterCommandHandler(IAuthDbContext dbContext, IPasswordHasher passwordHasher, IJwtTokenService jwtTokenService)
    : ICommandHandler<RegisterCommand, AuthResponseDto>
{
    public async Task<AuthResponseDto> Handle(RegisterCommand command, CancellationToken cancellationToken)
    {
        var email = command.Email.Trim().ToLowerInvariant();
        var existingUser = dbContext.Users.FirstOrDefault(x => x.Email.ToLower() == email);
        if (existingUser is not null)
        {
            throw new InvalidOperationException("Email already exists.");
        }

        var user = new User
        {
            FullName = command.FullName.Trim(),
            Email = email,
            Phone = command.Phone.Trim(),
            PasswordHash = passwordHasher.Hash(command.Password),
            Role = "customer",
            Status = "active",
            CreatedAt = DateTime.UtcNow
        };

        await dbContext.AddUserAsync(user, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        return jwtTokenService.CreateAuthResponse(user);
    }
}
