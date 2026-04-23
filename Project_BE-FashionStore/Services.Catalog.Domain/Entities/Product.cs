namespace Services.Catalog.Domain.Entities;

public class Product
{
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public decimal? OldPrice { get; set; }
    public string Status { get; set; } = "active";
    public string? Badge { get; set; }
    public decimal RatingAverage { get; set; } = 0;
    public int ReviewCount { get; set; } = 0;
    public int SoldCount { get; set; } = 0;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    
    // Navigation
    public virtual Category Category { get; set; } = null!;
    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();
    public virtual ICollection<ProductVariant> ProductVariants { get; set; } = new List<ProductVariant>();
    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
    public virtual ICollection<WishlistItem> WishlistItems { get; set; } = new List<WishlistItem>();

    // Constructors
    public Product() { }

    public Product(int id, int categoryId, string name, string slug, decimal price, bool isActive, 
                   string? description = null, decimal? oldPrice = null, string? badge = null)
    {
        Id = id;
        CategoryId = categoryId;
        Name = name;
        Slug = slug;
        Price = price;
        IsActive = isActive;
        Description = description;
        OldPrice = oldPrice;
        Badge = badge;
        Status = isActive ? "active" : "inactive";
        CreatedAt = DateTime.UtcNow;
    }

    // Methods
    public void Update(int categoryId, string name, string slug, decimal price, bool isActive,
                      string? description = null, decimal? oldPrice = null, string? badge = null)
    {
        CategoryId = categoryId;
        Name = name;
        Slug = slug;
        Price = price;
        IsActive = isActive;
        Description = description;
        OldPrice = oldPrice;
        Badge = badge;
        Status = isActive ? "active" : "inactive";
        UpdatedAt = DateTime.UtcNow;
    }
}
