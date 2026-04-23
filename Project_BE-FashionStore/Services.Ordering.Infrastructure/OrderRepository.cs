using Microsoft.EntityFrameworkCore;
using Services.Ordering.Application.Abstractions.Persistence;
using Services.Ordering.Domain.Entities;
using Services.Ordering.Infrastructure.Persistence;

namespace Services.Ordering.Infrastructure;

public sealed class OrderRepository : IOrderRepository
{
    private readonly OrderingDbContext _dbContext;

    public OrderRepository(OrderingDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyCollection<Order>> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Orders
            .Include(order => order.Items)
            .AsNoTracking()
            .Where(order => order.UserId == userId)
            .OrderByDescending(order => order.CreatedAtUtc)
            .ToListAsync(cancellationToken);
    }

    public Task<Order?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return _dbContext.Orders
            .Include(order => order.Items)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task AddAsync(Order order, CancellationToken cancellationToken = default)
    {
        await _dbContext.Orders.AddAsync(order, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Order order, CancellationToken cancellationToken = default)
    {
        _dbContext.Orders.Update(order);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
