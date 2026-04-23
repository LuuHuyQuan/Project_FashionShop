namespace Services.Auth.Domain.Entities;

public sealed class WishlistItem
{
    public int Id { get; private set; }
    public int UserId { get; private set; }
    public int ProductId { get; private set; }
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public User User { get; private set; } = null!;

    private WishlistItem()
    {
    }

    public WishlistItem(int userId, int productId)
    {
        UserId = userId;
        ProductId = productId;
        CreatedAt = DateTime.UtcNow;
    }
}
