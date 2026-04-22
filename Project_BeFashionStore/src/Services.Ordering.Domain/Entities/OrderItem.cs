namespace Services.Ordering.Domain.Entities;

public sealed class OrderItem
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

    public Order Order { get; set; } = null!;
}
