namespace Services.Catalog.Domain.Entities;

public sealed class ProductImage
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string Url { get; set; } = string.Empty;
    public bool IsThumbnail { get; set; }
    public int SortOrder { get; set; }

    public Product Product { get; set; } = null!;
}
