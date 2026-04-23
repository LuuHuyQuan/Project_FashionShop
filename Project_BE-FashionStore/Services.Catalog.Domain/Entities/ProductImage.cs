namespace Services.Catalog.Domain.Entities;

public class ProductImage
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string Url { get; set; } = string.Empty;
    public bool IsThumbnail { get; set; } = false;
    public int SortOrder { get; set; } = 0;
    
    // Navigation
    public virtual Product Product { get; set; } = null!;
}
