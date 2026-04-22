namespace Services.Ordering.Domain.Entities;

public sealed class Cart
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<CartItem> Items { get; set; } = new List<CartItem>();
}
