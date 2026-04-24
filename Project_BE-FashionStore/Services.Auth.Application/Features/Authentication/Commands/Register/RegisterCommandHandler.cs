using MediatR;
using Services.Auth.Application.Abstractions.Persistence;
using Services.Auth.Application.Features.Authentication.Common;
using Services.Auth.Application.Services;
using Services.Auth.Domain.Entities;

namespace Services.Auth.Application.Features.Authentication.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, AuthResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly IJwtService _jwtService;

    public RegisterCommandHandler(
        IUserRepository userRepository,
        IRefreshTokenRepository refreshTokenRepository,
        IJwtService jwtService)
    {
        _userRepository = userRepository;
        _refreshTokenRepository = refreshTokenRepository;
        _jwtService = jwtService;
    }

    public async Task<AuthResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        if (await _userRepository.EmailExistsAsync(request.Email))
            throw new InvalidOperationException("Email already exists");

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            Phone = request.Phone,
            PasswordHash = passwordHash,
            Role = "customer",
            Status = "active"
        };

        var created = await _userRepository.CreateAsync(user);

        var accessToken = _jwtService.GenerateAccessToken(created);
        var refreshToken = _jwtService.GenerateRefreshToken();

        var refreshTokenEntity = new Domain.Entities.RefreshToken
        {
            UserId = created.Id,
            Token = refreshToken,
            ExpiresAt = DateTime.UtcNow.AddDays(7),
            CreatedAt = DateTime.UtcNow
        };

        await _refreshTokenRepository.CreateAsync(refreshTokenEntity);

        return new AuthResponse(
            created.Id,
            created.FullName,
            created.Email,
            created.Phone,
            created.Role,
            accessToken,
            refreshToken
        );
    }
}
