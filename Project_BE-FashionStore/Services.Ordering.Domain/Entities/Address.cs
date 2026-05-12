using BuldingBlock.Domain.Common;

namespace Services.Ordering.Domain.Entities;

public class Address : BaseEntity
{
    public int UserId { get; set; }
    public string RecipientName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string AddressLine { get; set; } = string.Empty;
    public string? City { get; set; }
    public string? District { get; set; }
    public string? Ward { get; set; }
    public bool IsDefault { get; set; }

    public string FullAddress => $"{AddressLine}, {Ward}, {District}, {City}".Trim(',', ' ');
}
