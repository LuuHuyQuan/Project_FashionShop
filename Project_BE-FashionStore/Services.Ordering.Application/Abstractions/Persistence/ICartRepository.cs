using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Application.Abstractions.Persistence;

public interface ICartRepository
{
    Task<Cart?> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default);
    Task<Cart> GetOrCreateAsync(int userId, CancellationToken cancellationToken = default);
    Task SaveChangesAsync(CancellationToken cancellationToken = default);
}
