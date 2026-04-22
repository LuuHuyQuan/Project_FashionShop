using System.Security.Cryptography;
using System.Text;
using Services.Auth.Application.Abstractions;

namespace Services.Auth.Infrastructure.Security;

public sealed class Sha256PasswordHasher : IPasswordHasher
{
    public string Hash(string password)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));
        return Convert.ToHexString(bytes);
    }

    public bool Verify(string password, string passwordHash)
    {
        return Hash(password).Equals(passwordHash, StringComparison.OrdinalIgnoreCase);
    }
}
