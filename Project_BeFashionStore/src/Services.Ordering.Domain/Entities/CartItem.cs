namespace Services.Ordering.Domain.Entities;

public sealed class CartItem
{
    public int Id { get; set; }
    public int CartId { get; set; }
    public int ProductVariantId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPriceSnapshot { get; set; }

    public Cart Cart { get; set; } = null!;
}
