namespace Services.Ordering.Domain.Entities;

public sealed class Order
{
    public int Id { get; set; }
    public string OrderCode { get; set; } = string.Empty;
    public int UserId { get; set; }
    public string Status { get; set; } = "pending";
    public string PaymentMethod { get; set; } = "COD";
    public string PaymentStatus { get; set; } = "pending";
    public string ShippingName { get; set; } = string.Empty;
    public string ShippingPhone { get; set; } = string.Empty;
    public string ShippingEmail { get; set; } = string.Empty;
    public string ShippingAddress { get; set; } = string.Empty;
    public string? City { get; set; }
    public string? District { get; set; }
    public string? Ward { get; set; }
    public string? Note { get; set; }
    public decimal Subtotal { get; set; }
    public decimal ShippingFee { get; set; }
    public decimal DiscountAmount { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}
