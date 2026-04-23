using Services.Auth.Domain.Entities;

namespace Services.Auth.Application.Services;

public interface IJwtService
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
    int? ValidateToken(string token);
}
