using BuldingBlock.Domain.Common;

namespace Services.Catalog.Domain.Entities;

public class ProductVariant : BaseEntity
{
    public int ProductId { get; set; }
    public int ColorId { get; set; }
    public int SizeId { get; set; }
    public string SKU { get; set; } = string.Empty;
    public int StockQuantity { get; set; }
    public decimal? PriceOverride { get; set; }

    // Navigation properties
    public virtual Product Product { get; set; } = null!;
    public virtual Color Color { get; set; } = null!;
    public virtual Size Size { get; set; } = null!;

    // Business methods
    public bool IsInStock() => StockQuantity > 0;

    public bool HasStock(int quantity) => StockQuantity >= quantity;

    public void ReduceStock(int quantity)
    {
        if (quantity > StockQuantity)
            throw new InvalidOperationException("Insufficient stock");
        
        StockQuantity -= quantity;
    }

    public void IncreaseStock(int quantity)
    {
        StockQuantity += quantity;
    }

    public decimal GetPrice()
    {
        return PriceOverride ?? Product?.Price ?? 0;
    }
}
