using MediatR;
using Services.Auth.Application.Abstractions.Persistence;
using Services.Auth.Application.Features.Authentication.Common;
using Services.Auth.Application.Services;
using Services.Auth.Domain.Entities;

namespace Services.Auth.Application.Features.Authentication.Commands.RefreshToken;

public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, AuthResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly IJwtService _jwtService;

    public RefreshTokenCommandHandler(
        IUserRepository userRepository,
        IRefreshTokenRepository refreshTokenRepository,
        IJwtService jwtService)
    {
        _userRepository = userRepository;
        _refreshTokenRepository = refreshTokenRepository;
        _jwtService = jwtService;
    }

    public async Task<AuthResponse> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var refreshToken = await _refreshTokenRepository.GetByTokenAsync(request.RefreshToken);
        
        if (refreshToken == null || refreshToken.ExpiresAt < DateTime.UtcNow || refreshToken.RevokedAt != null)
            throw new UnauthorizedAccessException("Invalid or expired refresh token");

        var user = await _userRepository.GetByIdAsync(refreshToken.UserId);
        
        if (user == null || user.Status != "active")
            throw new UnauthorizedAccessException("User not found or inactive");

        // Revoke old refresh token
        await _refreshTokenRepository.RevokeAsync(refreshToken.Token);

        // Generate new tokens
        var accessToken = _jwtService.GenerateAccessToken(user);
        var newRefreshToken = _jwtService.GenerateRefreshToken();

        var newRefreshTokenEntity = new Domain.Entities.RefreshToken
        {
            UserId = user.Id,
            Token = newRefreshToken,
            ExpiresAt = DateTime.UtcNow.AddDays(7),
            CreatedAt = DateTime.UtcNow
        };

        await _refreshTokenRepository.CreateAsync(newRefreshTokenEntity);

        return new AuthResponse(
            user.Id,
            user.FullName,
            user.Email,
            user.Phone,
            user.Role,
            accessToken,
            newRefreshToken
        );
    }
}
