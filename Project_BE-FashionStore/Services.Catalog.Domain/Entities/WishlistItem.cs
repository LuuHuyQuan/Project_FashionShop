using BuldingBlock.Domain.Common;

namespace Services.Catalog.Domain.Entities;

public class WishlistItem : BaseEntity
{
    public int UserId { get; set; }
    public int ProductId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    // Navigation property
    public virtual Product Product { get; set; } = null!;
}
