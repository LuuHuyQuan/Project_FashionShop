namespace Services.Catalog.Domain.Entities;

public class ProductVariant
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public int ColorId { get; set; }
    public int SizeId { get; set; }
    public string SKU { get; set; } = string.Empty;
    public int StockQuantity { get; set; } = 0;
    public decimal? PriceOverride { get; set; }
    
    // Navigation
    public virtual Product Product { get; set; } = null!;
    public virtual Color Color { get; set; } = null!;
    public virtual Size Size { get; set; } = null!;
}
