using MediatR;
using Services.Auth.Application.Abstractions.Authentication;
using Services.Auth.Application.Abstractions.Persistence;
using Services.Auth.Application.Common.Models;
using Services.Auth.Domain.Entities;

namespace Services.Auth.Application.Features.Authentication.Commands.Login;

public sealed class LoginCommandHandler : IRequestHandler<LoginCommand, AuthenticationResult>
{
    private readonly IUserRepository _userRepository;
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IRefreshTokenGenerator _refreshTokenGenerator;

    public LoginCommandHandler(
        IUserRepository userRepository,
        IRefreshTokenRepository refreshTokenRepository,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator,
        IRefreshTokenGenerator refreshTokenGenerator)
    {
        _userRepository = userRepository;
        _refreshTokenRepository = refreshTokenRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
        _refreshTokenGenerator = refreshTokenGenerator;
    }

    public async Task<AuthenticationResult> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = await _userRepository.GetByEmailAsync(email, cancellationToken)
            ?? throw new UnauthorizedAccessException("Invalid email or password.");

        if (!string.Equals(user.Status, "active", StringComparison.OrdinalIgnoreCase))
        {
            throw new UnauthorizedAccessException("User account is inactive.");
        }

        if (!_passwordHasher.Verify(request.Password, user.PasswordHash))
        {
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        var refreshTokenValue = _refreshTokenGenerator.Generate();
        var refreshTokenExpiresAt = DateTime.UtcNow.AddDays(7);
        var refreshToken = new Services.Auth.Domain.Entities.RefreshToken(user.Id, refreshTokenValue, refreshTokenExpiresAt);

        await _refreshTokenRepository.AddAsync(refreshToken, cancellationToken);
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
            refreshTokenValue,
            refreshTokenExpiresAt);
    }
}
