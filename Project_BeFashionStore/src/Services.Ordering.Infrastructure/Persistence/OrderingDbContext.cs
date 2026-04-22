using Microsoft.EntityFrameworkCore;
using Services.Ordering.Application.Abstractions;
using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Infrastructure.Persistence;

public sealed class OrderingDbContext(DbContextOptions<OrderingDbContext> options) : DbContext(options), IOrderingDbContext
{
    public DbSet<Address> AddressesSet => Set<Address>();
    public DbSet<Cart> CartsSet => Set<Cart>();
    public DbSet<CartItem> CartItemsSet => Set<CartItem>();
    public DbSet<Order> OrdersSet => Set<Order>();
    public DbSet<OrderItem> OrderItemsSet => Set<OrderItem>();
    public DbSet<Review> ReviewsSet => Set<Review>();
    public DbSet<WishlistItem> WishlistItemsSet => Set<WishlistItem>();

    public IQueryable<Address> Addresses => AddressesSet.AsQueryable();
    public IQueryable<Cart> Carts => CartsSet.Include(x => x.Items).AsQueryable();
    public IQueryable<CartItem> CartItems => CartItemsSet.AsQueryable();
    public IQueryable<Order> Orders => OrdersSet.Include(x => x.Items).AsQueryable();
    public IQueryable<OrderItem> OrderItems => OrderItemsSet.AsQueryable();
    public IQueryable<Review> Reviews => ReviewsSet.AsQueryable();
    public IQueryable<WishlistItem> WishlistItems => WishlistItemsSet.AsQueryable();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(OrderingDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }

    public async Task<Address> AddAddressAsync(Address address, CancellationToken cancellationToken)
    {
        await AddressesSet.AddAsync(address, cancellationToken);
        return address;
    }

    public async Task<Cart> AddCartAsync(Cart cart, CancellationToken cancellationToken)
    {
        await CartsSet.AddAsync(cart, cancellationToken);
        return cart;
    }

    public async Task<CartItem> AddCartItemAsync(CartItem cartItem, CancellationToken cancellationToken)
    {
        await CartItemsSet.AddAsync(cartItem, cancellationToken);
        return cartItem;
    }

    public async Task<Order> AddOrderAsync(Order order, CancellationToken cancellationToken)
    {
        await OrdersSet.AddAsync(order, cancellationToken);
        return order;
    }

    public async Task<OrderItem> AddOrderItemAsync(OrderItem orderItem, CancellationToken cancellationToken)
    {
        await OrderItemsSet.AddAsync(orderItem, cancellationToken);
        return orderItem;
    }

    public async Task<Review> AddReviewAsync(Review review, CancellationToken cancellationToken)
    {
        await ReviewsSet.AddAsync(review, cancellationToken);
        return review;
    }

    public async Task<WishlistItem> AddWishlistItemAsync(WishlistItem wishlistItem, CancellationToken cancellationToken)
    {
        await WishlistItemsSet.AddAsync(wishlistItem, cancellationToken);
        return wishlistItem;
    }

    public void RemoveAddress(Address address) => AddressesSet.Remove(address);
    public void RemoveCartItem(CartItem cartItem) => CartItemsSet.Remove(cartItem);
    public void RemoveReview(Review review) => ReviewsSet.Remove(review);
    public void RemoveWishlistItem(WishlistItem wishlistItem) => WishlistItemsSet.Remove(wishlistItem);
}
