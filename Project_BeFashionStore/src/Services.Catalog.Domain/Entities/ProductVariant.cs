namespace Services.Catalog.Domain.Entities;

public sealed class ProductVariant
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public int ColorId { get; set; }
    public int SizeId { get; set; }
    public string SKU { get; set; } = string.Empty;
    public int StockQuantity { get; set; }
    public decimal? PriceOverride { get; set; }

    public Product Product { get; set; } = null!;
}
