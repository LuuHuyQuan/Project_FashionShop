namespace Services.Auth.Application.Features.Authentication.Common;

public record AuthResponse(
    int Id,
    string FullName,
    string Email,
    string Phone,
    string Role,
    string AccessToken,
    string RefreshToken
);
