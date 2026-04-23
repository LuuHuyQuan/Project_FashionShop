namespace Services.Auth.Application.Features.Users.Common;

public sealed record UserResponse(
    int Id,
    string FullName,
    string Email,
    string Phone,
    string Role,
    string Status,
    DateTime CreatedAt,
    DateTime? UpdatedAt);
