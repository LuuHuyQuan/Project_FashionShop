using System.Security.Cryptography;
using Services.Auth.Application.Abstractions.Authentication;

namespace Services.Auth.Infrastructure.Authentication;

public sealed class RefreshTokenGenerator : IRefreshTokenGenerator
{
    public string Generate()
    {
        return Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
    }
}
