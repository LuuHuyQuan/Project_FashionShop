using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Services.Auth.Application.Abstractions;
using Services.Auth.Application.Contracts;
using Services.Auth.Domain.Entities;

namespace Services.Auth.Infrastructure.Security;

public sealed class JwtTokenService(IOptions<JwtOptions> options, IAuthDbContext dbContext) : IJwtTokenService
{
    private readonly JwtOptions _options = options.Value;

    public AuthResponseDto CreateAuthResponse(User user)
    {
        var expiresAt = DateTime.UtcNow.AddMinutes(_options.AccessTokenMinutes);
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(ClaimTypes.Name, user.FullName),
            new(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var jwtToken = new JwtSecurityToken(
            issuer: _options.Issuer,
            audience: _options.Audience,
            claims: claims,
            expires: expiresAt,
            signingCredentials: credentials);

        var accessToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);
        var refreshTokenValue = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));

        var refreshToken = new RefreshToken
        {
            UserId = user.Id,
            Token = refreshTokenValue,
            CreatedAt = DateTime.UtcNow,
            ExpiresAt = DateTime.UtcNow.AddDays(_options.RefreshTokenDays)
        };

        dbContext.AddRefreshTokenAsync(refreshToken, CancellationToken.None).GetAwaiter().GetResult();
        dbContext.SaveChangesAsync(CancellationToken.None).GetAwaiter().GetResult();

        return new AuthResponseDto(
            accessToken,
            refreshTokenValue,
            expiresAt,
            new AuthUserDto(user.Id, user.FullName, user.Email, user.Phone, user.Role, user.Status));
    }
}
