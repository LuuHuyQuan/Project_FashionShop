namespace Services.Auth.Infrastructure.Authentication;

public sealed class RefreshTokenOptions
{
    public const string SectionName = "RefreshToken";

    public int ExpiryDays { get; init; } = 7;
}
