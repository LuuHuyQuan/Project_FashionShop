namespace Services.Ordering.Domain.Entities;

public sealed class Address
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string RecipientName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string AddressLine { get; set; } = string.Empty;
    public string? City { get; set; }
    public string? District { get; set; }
    public string? Ward { get; set; }
    public bool IsDefault { get; set; }
}
