using Services.Auth.Domain.Entities;

namespace Services.Auth.Application.Abstractions.Persistence;

public interface IRefreshTokenRepository
{
    Task<RefreshToken?> GetByTokenAsync(string token);
    Task<RefreshToken> CreateAsync(RefreshToken refreshToken);
    Task RevokeAsync(string token);
}
