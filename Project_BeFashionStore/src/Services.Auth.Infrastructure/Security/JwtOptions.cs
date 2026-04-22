namespace Services.Auth.Infrastructure.Security;

public sealed class JwtOptions
{
    public const string SectionName = "Jwt";

    public string Issuer { get; set; } = "FashionStore.Auth";
    public string Audience { get; set; } = "FashionStore.Client";
    public string SecretKey { get; set; } = "super-secret-key-change-this-in-production-123456789";
    public int AccessTokenMinutes { get; set; } = 120;
    public int RefreshTokenDays { get; set; } = 7;
}
