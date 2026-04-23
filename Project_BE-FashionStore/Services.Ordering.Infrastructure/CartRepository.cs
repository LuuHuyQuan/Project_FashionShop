using Microsoft.EntityFrameworkCore;
using Services.Ordering.Application.Abstractions.Persistence;
using Services.Ordering.Domain.Entities;
using Services.Ordering.Infrastructure.Persistence;

namespace Services.Ordering.Infrastructure;

public sealed class CartRepository : ICartRepository
{
    private readonly OrderingDbContext _dbContext;

    public CartRepository(OrderingDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Task<Cart?> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default)
    {
        return _dbContext.Carts
            .Include(x => x.Items)
            .FirstOrDefaultAsync(x => x.UserId == userId, cancellationToken);
    }

    public async Task<Cart> GetOrCreateAsync(int userId, CancellationToken cancellationToken = default)
    {
        var cart = await GetByUserIdAsync(userId, cancellationToken);
        if (cart is not null)
        {
            return cart;
        }

        cart = new Cart(userId);
        await _dbContext.Carts.AddAsync(cart, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return cart;
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return _dbContext.SaveChangesAsync(cancellationToken);
    }
}
