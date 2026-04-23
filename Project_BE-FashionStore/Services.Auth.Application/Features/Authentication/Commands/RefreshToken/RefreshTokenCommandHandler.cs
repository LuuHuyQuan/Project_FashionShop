using MediatR;
using Services.Auth.Application.Abstractions.Authentication;
using Services.Auth.Application.Abstractions.Persistence;
using Services.Auth.Application.Common.Models;
using Services.Auth.Domain.Entities;

namespace Services.Auth.Application.Features.Authentication.Commands.RefreshToken;

public sealed class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, AuthenticationResult>
{
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly IUserRepository _userRepository;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IRefreshTokenGenerator _refreshTokenGenerator;

    public RefreshTokenCommandHandler(
        IRefreshTokenRepository refreshTokenRepository,
        IUserRepository userRepository,
        IJwtTokenGenerator jwtTokenGenerator,
        IRefreshTokenGenerator refreshTokenGenerator)
    {
        _refreshTokenRepository = refreshTokenRepository;
        _userRepository = userRepository;
        _jwtTokenGenerator = jwtTokenGenerator;
        _refreshTokenGenerator = refreshTokenGenerator;
    }

    public async Task<AuthenticationResult> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var existingToken = await _refreshTokenRepository.GetByTokenAsync(request.RefreshToken, cancellationToken)
            ?? throw new UnauthorizedAccessException("Invalid refresh token.");

        if (!existingToken.IsActive)
        {
            throw new UnauthorizedAccessException("Refresh token expired or revoked.");
        }

        var user = await _userRepository.GetByIdAsync(existingToken.UserId, cancellationToken)
            ?? throw new KeyNotFoundException("User not found.");

        existingToken.Revoke();

        var newRefreshTokenValue = _refreshTokenGenerator.Generate();
        var newRefreshTokenExpiresAt = DateTime.UtcNow.AddDays(7);
        var newRefreshToken = new Services.Auth.Domain.Entities.RefreshToken(user.Id, newRefreshTokenValue, newRefreshTokenExpiresAt);

        await _refreshTokenRepository.AddAsync(newRefreshToken, cancellationToken);
        await _refreshTokenRepository.SaveChangesAsync(cancellationToken);

        var accessToken = _jwtTokenGenerator.GenerateToken(user.Id, user.FullName, user.Email, user.Role);

        return new AuthenticationResult(
            user.Id,
            user.FullName,
            user.Email,
            user.Phone,
            user.Role,
            user.Status,
            accessToken,
            newRefreshTokenValue,
            newRefreshTokenExpiresAt);
    }
}
