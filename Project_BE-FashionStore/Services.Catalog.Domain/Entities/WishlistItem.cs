namespace Services.Catalog.Domain.Entities;

public class WishlistItem
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int ProductId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation
    public virtual Product Product { get; set; } = null!;
}
