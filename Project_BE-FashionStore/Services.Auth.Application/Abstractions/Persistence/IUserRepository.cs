using Services.Auth.Domain.Entities;

namespace Services.Auth.Application.Abstractions.Persistence;

public interface IUserRepository
{
    Task AddAsync(User user, CancellationToken cancellationToken = default);
    Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);
    Task<User?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken = default);
    void Remove(User user);
    Task SaveChangesAsync(CancellationToken cancellationToken = default);
}
