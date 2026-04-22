namespace Services.Auth.Application.Abstractions;

using Services.Auth.Application.Contracts;
using Services.Auth.Domain.Entities;

public interface IAuthDbContext
{
    IQueryable<User> Users { get; }
    IQueryable<RefreshToken> RefreshTokens { get; }

    Task<User> AddUserAsync(User user, CancellationToken cancellationToken);
    Task<RefreshToken> AddRefreshTokenAsync(RefreshToken refreshToken, CancellationToken cancellationToken);
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}

public interface IPasswordHasher
{
    string Hash(string password);
    bool Verify(string password, string passwordHash);
}

public interface IJwtTokenService
{
    AuthResponseDto CreateAuthResponse(User user);
}
