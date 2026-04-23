namespace Services.Auth.Application.Abstractions.Authentication;

public interface IJwtTokenGenerator
{
    string GenerateToken(int userId, string fullName, string email, string role);
}
