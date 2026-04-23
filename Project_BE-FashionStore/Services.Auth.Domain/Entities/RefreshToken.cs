namespace Services.Auth.Domain.Entities;

public class RefreshToken
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Token { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? RevokedAt { get; set; }
    
    // Navigation
    public virtual User User { get; set; } = null!;

    // Constructors
    public RefreshToken() { }

    public RefreshToken(int userId, string token, DateTime expiresAt)
    {
        UserId = userId;
        Token = token;
        ExpiresAt = expiresAt;
        CreatedAt = DateTime.UtcNow;
    }

    // Properties
    public bool IsActive => RevokedAt == null && ExpiresAt > DateTime.UtcNow;

    // Methods
    public void Revoke()
    {
        RevokedAt = DateTime.UtcNow;
    }
}
