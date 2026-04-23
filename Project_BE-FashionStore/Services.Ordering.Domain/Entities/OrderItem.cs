namespace Services.Ordering.Domain.Entities;

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public int? ProductVariantId { get; set; }
    public string ProductNameSnapshot { get; set; } = string.Empty;
    public string? ColorSnapshot { get; set; }
    public string? SizeSnapshot { get; set; }
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
    public decimal LineTotal { get; set; }
    
    public virtual Order Order { get; set; } = null!;

    public OrderItem() { }

    public OrderItem(int productId, string productNameSnapshot, decimal unitPrice, int quantity,
                     int? productVariantId = null, string? colorSnapshot = null, string? sizeSnapshot = null)
    {
        ProductId = productId;
        ProductNameSnapshot = productNameSnapshot;
        UnitPrice = unitPrice;
        Quantity = quantity;
        ProductVariantId = productVariantId;
        ColorSnapshot = colorSnapshot;
        SizeSnapshot = sizeSnapshot;
        LineTotal = unitPrice * quantity;
    }
}
