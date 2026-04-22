namespace Services.Auth.Application.Contracts;

public sealed record AuthUserDto(
    int Id,
    string FullName,
    string Email,
    string Phone,
    string Role,
    string Status);

public sealed record AuthResponseDto(
    string AccessToken,
    string RefreshToken,
    DateTime ExpiresAt,
    AuthUserDto User);
