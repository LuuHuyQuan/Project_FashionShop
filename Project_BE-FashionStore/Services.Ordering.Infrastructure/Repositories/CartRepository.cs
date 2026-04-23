using Microsoft.EntityFrameworkCore;
using Services.Ordering.Domain.Entities;
using Services.Ordering.Infrastructure.Persistence;

namespace Services.Ordering.Infrastructure.Repositories;

public interface ICartRepository
{
    Task<Cart?> GetByUserIdAsync(int userId);
    Task<Cart> CreateAsync(Cart cart);
    Task<Cart> UpdateAsync(Cart cart);
    Task DeleteAsync(int id);
    Task<CartItem> AddItemAsync(CartItem cartItem);
    Task<CartItem> UpdateItemAsync(CartItem cartItem);
    Task RemoveItemAsync(int cartItemId);
    Task ClearCartAsync(int cartId);
}

public class CartRepository : ICartRepository
{
    private readonly OrderingDbContext _context;

    public CartRepository(OrderingDbContext context)
    {
        _context = context;
    }

    public async Task<Cart?> GetByUserIdAsync(int userId)
    {
        return await _context.Carts
            .Include(c => c.CartItems)
            .FirstOrDefaultAsync(c => c.UserId == userId);
    }

    public async Task<Cart> CreateAsync(Cart cart)
    {
        _context.Carts.Add(cart);
        await _context.SaveChangesAsync();
        return cart;
    }

    public async Task<Cart> UpdateAsync(Cart cart)
    {
        cart.UpdatedAt = DateTime.UtcNow;
        _context.Carts.Update(cart);
        await _context.SaveChangesAsync();
        return cart;
    }

    public async Task DeleteAsync(int id)
    {
        var cart = await _context.Carts.FindAsync(id);
        if (cart != null)
        {
            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<CartItem> AddItemAsync(CartItem cartItem)
    {
        _context.CartItems.Add(cartItem);
        await _context.SaveChangesAsync();
        return cartItem;
    }

    public async Task<CartItem> UpdateItemAsync(CartItem cartItem)
    {
        _context.CartItems.Update(cartItem);
        await _context.SaveChangesAsync();
        return cartItem;
    }

    public async Task RemoveItemAsync(int cartItemId)
    {
        var cartItem = await _context.CartItems.FindAsync(cartItemId);
        if (cartItem != null)
        {
            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();
        }
    }

    public async Task ClearCartAsync(int cartId)
    {
        var cartItems = await _context.CartItems
            .Where(ci => ci.CartId == cartId)
            .ToListAsync();
        
        _context.CartItems.RemoveRange(cartItems);
        await _context.SaveChangesAsync();
    }
}
