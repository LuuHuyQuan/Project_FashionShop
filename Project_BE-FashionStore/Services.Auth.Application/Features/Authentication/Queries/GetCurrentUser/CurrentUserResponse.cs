namespace Services.Auth.Application.Features.Authentication.Queries.GetCurrentUser;

public sealed record CurrentUserResponse(
    int UserId,
    string FullName,
    string Email,
    string Phone,
    string Role,
    string Status,
    DateTime CreatedAt,
    DateTime? UpdatedAt);
