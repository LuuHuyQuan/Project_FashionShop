namespace Services.Ordering.Domain.Entities;

public class Cart
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
    public IReadOnlyCollection<CartItem> Items => CartItems.ToList();

    public Cart() { }

    public Cart(int userId)
    {
        UserId = userId;
        UpdatedAt = DateTime.UtcNow;
    }

    public void AddItem(CartItem item)
    {
        CartItems.Add(item);
        UpdatedAt = DateTime.UtcNow;
    }
}
