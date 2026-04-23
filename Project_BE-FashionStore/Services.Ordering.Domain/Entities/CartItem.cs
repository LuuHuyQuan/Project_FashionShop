namespace Services.Ordering.Domain.Entities;

public class CartItem
{
    public int Id { get; set; }
    public int CartId { get; set; }
    public int ProductVariantId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPriceSnapshot { get; set; }
    
    public virtual Cart Cart { get; set; } = null!;

    public CartItem() { }

    public CartItem(int productVariantId, int quantity, decimal unitPriceSnapshot)
    {
        ProductVariantId = productVariantId;
        Quantity = quantity;
        UnitPriceSnapshot = unitPriceSnapshot;
    }
}
