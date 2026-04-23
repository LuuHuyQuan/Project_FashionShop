namespace Services.Catalog.Domain.Entities;

public class Size
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    
    // Navigation
    public virtual ICollection<ProductVariant> ProductVariants { get; set; } = new List<ProductVariant>();
}
