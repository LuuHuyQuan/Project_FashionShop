using BuldingBlock.Domain.Common;

namespace Services.Catalog.Domain.Entities;

public class Review : BaseEntity
{
    public int UserId { get; set; }
    public int ProductId { get; set; }
    public int Rating { get; set; } // 1-5
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    // Navigation property
    public virtual Product Product { get; set; } = null!;

    // Validation
    public bool IsValidRating() => Rating >= 1 && Rating <= 5;
}
