using BuldingBlock.Domain.Common;

namespace Services.Catalog.Domain.Entities;

public class Size : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    // Navigation property
    public virtual ICollection<ProductVariant> ProductVariants { get; set; } = new List<ProductVariant>();
}
