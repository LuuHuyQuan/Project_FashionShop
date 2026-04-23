namespace Services.Auth.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "customer"; // admin, customer
    public string Status { get; set; } = "active"; // active, inactive
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    
    // Navigation properties
    public virtual ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();

    // Constructors
    public User() { }

    public User(string fullName, string email, string phone, string passwordHash, string role)
    {
        FullName = fullName;
        Email = email;
        Phone = phone;
        PasswordHash = passwordHash;
        Role = role;
        Status = "active";
        CreatedAt = DateTime.UtcNow;
    }

    // Methods
    public void UpdateProfile(string fullName, string phone, string role, string status)
    {
        FullName = fullName;
        Phone = phone;
        Role = role;
        Status = status;
        UpdatedAt = DateTime.UtcNow;
    }
}
