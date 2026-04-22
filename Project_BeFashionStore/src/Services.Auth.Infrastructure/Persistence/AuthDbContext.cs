using Microsoft.EntityFrameworkCore;
using Services.Auth.Application.Abstractions;
using Services.Auth.Domain.Entities;

namespace Services.Auth.Infrastructure.Persistence;

public sealed class AuthDbContext(DbContextOptions<AuthDbContext> options) : DbContext(options), IAuthDbContext
{
    public DbSet<User> UsersSet => Set<User>();
    public DbSet<RefreshToken> RefreshTokensSet => Set<RefreshToken>();

    public IQueryable<User> Users => UsersSet.AsQueryable();
    public IQueryable<RefreshToken> RefreshTokens => RefreshTokensSet.AsQueryable();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AuthDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }

    public async Task<User> AddUserAsync(User user, CancellationToken cancellationToken)
    {
        await UsersSet.AddAsync(user, cancellationToken);
        return user;
    }

    public async Task<RefreshToken> AddRefreshTokenAsync(RefreshToken refreshToken, CancellationToken cancellationToken)
    {
        await RefreshTokensSet.AddAsync(refreshToken, cancellationToken);
        return refreshToken;
    }
}
