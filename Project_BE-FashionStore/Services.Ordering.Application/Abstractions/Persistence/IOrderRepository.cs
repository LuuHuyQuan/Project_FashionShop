using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Application.Abstractions.Persistence;

public interface IOrderRepository
{
    Task<IReadOnlyCollection<Order>> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default);
    Task<Order?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task AddAsync(Order order, CancellationToken cancellationToken = default);
    Task UpdateAsync(Order order, CancellationToken cancellationToken = default);
}
