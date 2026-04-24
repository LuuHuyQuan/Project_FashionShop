using Microsoft.EntityFrameworkCore;
using Services.Auth.Application.Abstractions.Persistence;
using Services.Auth.Domain.Entities;

namespace Services.Auth.Infrastructure.Persistence.Repositories;

public sealed class RefreshTokenRepository : IRefreshTokenRepository
{
    private readonly AuthDbContext _dbContext;

    public RefreshTokenRepository(AuthDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<RefreshToken?> GetByTokenAsync(string token)
    {
        return await _dbContext.RefreshTokens
            .FirstOrDefaultAsync(x => x.Token == token && x.RevokedAt == null);
    }

    public async Task<RefreshToken> CreateAsync(RefreshToken refreshToken)
    {
        await _dbContext.RefreshTokens.AddAsync(refreshToken);
        await _dbContext.SaveChangesAsync();
        return refreshToken;
    }

    public async Task RevokeAsync(string token)
    {
        var refreshToken = await _dbContext.RefreshTokens
            .FirstOrDefaultAsync(x => x.Token == token);
        
        if (refreshToken != null)
        {
            refreshToken.Revoke();
            await _dbContext.SaveChangesAsync();
        }
    }
}
