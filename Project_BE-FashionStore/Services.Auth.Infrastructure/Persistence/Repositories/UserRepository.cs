using Microsoft.EntityFrameworkCore;
using Services.Auth.Application.Abstractions.Persistence;
using Services.Auth.Application.Features.Users.Common;
using Services.Auth.Domain.Entities;

namespace Services.Auth.Infrastructure.Persistence.Repositories;

public sealed class UserRepository : IUserRepository, IReadOnlyUserRepository
{
    private readonly AuthDbContext _dbContext;

    public UserRepository(AuthDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(User user, CancellationToken cancellationToken = default)
    {
        await _dbContext.Users.AddAsync(user, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        return _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email, cancellationToken);
    }

    public Task<User?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        return _dbContext.Users.AnyAsync(x => x.Email == email, cancellationToken);
    }

    public void Remove(User user)
    {
        _dbContext.Users.Remove(user);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<UserResponse>> GetUsersAsync(CancellationToken cancellationToken = default)
    {
        return await _dbContext.Users
            .AsNoTracking()
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new UserResponse(
                x.Id,
                x.FullName,
                x.Email,
                x.Phone,
                x.Role,
                x.Status,
                x.CreatedAt,
                x.UpdatedAt))
            .ToListAsync(cancellationToken);
    }
}
