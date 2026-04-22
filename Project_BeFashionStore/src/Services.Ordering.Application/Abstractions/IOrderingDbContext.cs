using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Application.Abstractions;

public interface IOrderingDbContext
{
    IQueryable<Address> Addresses { get; }
    IQueryable<Cart> Carts { get; }
    IQueryable<CartItem> CartItems { get; }
    IQueryable<Order> Orders { get; }
    IQueryable<OrderItem> OrderItems { get; }
    IQueryable<Review> Reviews { get; }
    IQueryable<WishlistItem> WishlistItems { get; }

    Task<Address> AddAddressAsync(Address address, CancellationToken cancellationToken);
    Task<Cart> AddCartAsync(Cart cart, CancellationToken cancellationToken);
    Task<CartItem> AddCartItemAsync(CartItem cartItem, CancellationToken cancellationToken);
    Task<Order> AddOrderAsync(Order order, CancellationToken cancellationToken);
    Task<OrderItem> AddOrderItemAsync(OrderItem orderItem, CancellationToken cancellationToken);
    Task<Review> AddReviewAsync(Review review, CancellationToken cancellationToken);
    Task<WishlistItem> AddWishlistItemAsync(WishlistItem wishlistItem, CancellationToken cancellationToken);
    void RemoveAddress(Address address);
    void RemoveCartItem(CartItem cartItem);
    void RemoveReview(Review review);
    void RemoveWishlistItem(WishlistItem wishlistItem);
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
