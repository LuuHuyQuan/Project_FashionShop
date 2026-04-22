namespace Services.Catalog.Domain.Entities;

public sealed class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Status { get; set; } = "active";

    public ICollection<Product> Products { get; set; } = new List<Product>();
}
