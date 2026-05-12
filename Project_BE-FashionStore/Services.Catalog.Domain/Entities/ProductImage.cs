using BuldingBlock.Domain.Common;

namespace Services.Catalog.Domain.Entities;

public class ProductImage : BaseEntity
{
    public int ProductId { get; set; }
    public string Url { get; set; } = string.Empty;
    public bool IsThumbnail { get; set; }
    public int SortOrder { get; set; }

    public virtual Product Product { get; set; } = null!;
}
