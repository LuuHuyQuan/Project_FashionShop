using MediatR;
using Services.Auth.Application.Abstractions.Authentication;
using Services.Auth.Application.Abstractions.Persistence;
using Services.Auth.Application.Common.Models;
using Services.Auth.Domain.Entities;

namespace Services.Auth.Application.Features.Authentication.Commands.Register;

public sealed class RegisterCommandHandler : IRequestHandler<RegisterCommand, AuthenticationResult>
{
    private readonly IUserRepository _userRepository;
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IRefreshTokenGenerator _refreshTokenGenerator;

    public RegisterCommandHandler(
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

    public async Task<AuthenticationResult> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var email = request.Email.Trim().ToLowerInvariant();

        if (await _userRepository.ExistsByEmailAsync(email, cancellationToken))
        {
            throw new InvalidOperationException("Email already exists.");
        }

        var user = new User(
            request.FullName,
            email,
            request.Phone,
            _passwordHasher.Hash(request.Password),
            request.Role);

        await _userRepository.AddAsync(user, cancellationToken);

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
