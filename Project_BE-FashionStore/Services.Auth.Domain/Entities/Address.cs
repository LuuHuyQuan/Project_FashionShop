namespace Services.Auth.Domain.Entities;

public class Address
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string RecipientName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string AddressLine { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string District { get; set; } = string.Empty;
    public string Ward { get; set; } = string.Empty;
    public bool IsDefault { get; set; } = false;
    
    // Navigation
    public virtual User User { get; set; } = null!;

    // Constructors
    public Address() { }

    public Address(int userId, string recipientName, string phone, string addressLine, 
                   string city, string district, string ward, bool isDefault)
    {
        UserId = userId;
        RecipientName = recipientName;
        Phone = phone;
        AddressLine = addressLine;
        City = city;
        District = district;
        Ward = ward;
        IsDefault = isDefault;
    }
}
