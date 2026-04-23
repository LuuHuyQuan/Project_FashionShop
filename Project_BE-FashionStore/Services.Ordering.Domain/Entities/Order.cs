namespace Services.Ordering.Domain.Entities;

public class Order
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
    public decimal ShippingFee { get; set; } = 0;
    public decimal DiscountAmount { get; set; } = 0;
    public decimal TotalAmount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    public IReadOnlyCollection<OrderItem> Items => OrderItems.ToList();

    public Order() { }

    public Order(int id, string orderCode, int userId, string shippingName, string shippingPhone, 
                 string shippingEmail, string shippingAddress, string paymentMethod, string paymentStatus,
                 decimal shippingFee, decimal discountAmount, OrderItem[] items,
                 string? city = null, string? district = null, string? ward = null, string? note = null)
    {
        Id = id;
        OrderCode = orderCode;
        UserId = userId;
        ShippingName = shippingName;
        ShippingPhone = shippingPhone;
        ShippingEmail = shippingEmail;
        ShippingAddress = shippingAddress;
        PaymentMethod = paymentMethod;
        PaymentStatus = paymentStatus;
        ShippingFee = shippingFee;
        DiscountAmount = discountAmount;
        City = city;
        District = district;
        Ward = ward;
        Note = note;
        Status = "pending";
        CreatedAt = DateTime.UtcNow;
        CreatedAtUtc = DateTime.UtcNow;
        
        OrderItems = items.ToList();
        Subtotal = items.Sum(x => x.LineTotal);
        TotalAmount = Subtotal + ShippingFee - DiscountAmount;
    }

    public void UpdateStatus(string status, string? paymentStatus = null)
    {
        Status = status;
        if (paymentStatus != null)
        {
            PaymentStatus = paymentStatus;
        }
    }
}
