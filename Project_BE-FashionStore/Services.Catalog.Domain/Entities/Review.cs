namespace Services.Catalog.Domain.Entities;

public class Review
{
    public Review(int userId, int productId, int rating, string? comment)
    {
        UserId = userId;
        ProductId = productId;
        Rating = rating;
        Comment = comment;
    }

    public int Id { get; set; }
    public int UserId { get; set; }
    public int ProductId { get; set; }
    public int Rating { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation
    public virtual Product Product { get; set; } = null!;
}
