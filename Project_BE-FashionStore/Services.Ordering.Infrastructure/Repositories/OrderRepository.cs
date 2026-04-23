using Microsoft.EntityFrameworkCore;
using Services.Ordering.Domain.Entities;
using Services.Ordering.Infrastructure.Persistence;

namespace Services.Ordering.Infrastructure.Repositories;

public interface IOrderRepository
{
    Task<Order?> GetByIdAsync(int id);
    Task<Order?> GetByOrderCodeAsync(string orderCode);
    Task<IEnumerable<Order>> GetByUserIdAsync(int userId);
    Task<IEnumerable<Order>> GetAllAsync();
    Task<Order> CreateAsync(Order order);
    Task<Order> UpdateAsync(Order order);
    Task DeleteAsync(int id);
}

public class OrderRepository : IOrderRepository
{
    private readonly OrderingDbContext _context;

    public OrderRepository(OrderingDbContext context)
    {
        _context = context;
    }

    public async Task<Order?> GetByIdAsync(int id)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task<Order?> GetByOrderCodeAsync(string orderCode)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.OrderCode == orderCode);
    }

    public async Task<IEnumerable<Order>> GetByUserIdAsync(int userId)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();
    }

    public async Task<IEnumerable<Order>> GetAllAsync()
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();
    }

    public async Task<Order> CreateAsync(Order order)
    {
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        return order;
    }

    public async Task<Order> UpdateAsync(Order order)
    {
        _context.Orders.Update(order);
        await _context.SaveChangesAsync();
        return order;
    }

    public async Task DeleteAsync(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order != null)
        {
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
        }
    }
}
