namespace Services.Auth.Application.Common.Models;

public sealed record AuthenticationResult(
    int UserId,
    string FullName,
    string Email,
    string Phone,
    string Role,
    string Status,
    string AccessToken,
    string RefreshToken,
    DateTime RefreshTokenExpiresAt);
