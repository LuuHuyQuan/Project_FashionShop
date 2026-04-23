namespace Service.Auth.Api.Contracts.Authentication;

public sealed record RegisterRequest(
    string UserName,
    string Email,
    string Password,
    string Role = "Customer");
