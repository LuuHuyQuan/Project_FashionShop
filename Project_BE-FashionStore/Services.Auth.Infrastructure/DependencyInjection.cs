using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Services.Auth.Application.Abstractions.Authentication;
using Services.Auth.Application.Abstractions.Persistence;
using Services.Auth.Infrastructure.Authentication;
using Services.Auth.Infrastructure.Persistence;
using Services.Auth.Infrastructure.Persistence.Repositories;

namespace Services.Auth.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<JwtOptions>(configuration.GetSection(JwtOptions.SectionName));
        services.Configure<RefreshTokenOptions>(configuration.GetSection(RefreshTokenOptions.SectionName));

        var jwtSection = configuration.GetSection(JwtOptions.SectionName);
        var jwtKey = jwtSection["Key"];
        var jwtIssuer = jwtSection["Issuer"];
        var jwtAudience = jwtSection["Audience"];
        if (string.IsNullOrWhiteSpace(jwtKey) || string.IsNullOrWhiteSpace(jwtIssuer) || string.IsNullOrWhiteSpace(jwtAudience))
        {
            throw new InvalidOperationException("JWT configuration is incomplete.");
        }

        var connectionString = configuration.GetConnectionString("FashionStoreDb")
            ?? throw new InvalidOperationException("Missing connection string 'FashionStoreDb'.");

        services.AddDbContext<AuthDbContext>(options =>
            options.UseSqlServer(connectionString));

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IReadOnlyUserRepository, UserRepository>();
        services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
        services.AddScoped<IAddressRepository, AddressRepository>();
        services.AddScoped<IWishlistRepository, WishlistRepository>();
        services.AddSingleton<IPasswordHasher, PasswordHasher>();
        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddSingleton<IRefreshTokenGenerator, RefreshTokenGenerator>();

        return services;
    }
}
