using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Services.Auth.Application.Abstractions.Persistence;
using Services.Auth.Application.Services;
using Services.Auth.Infrastructure.Persistence;
using Services.Auth.Infrastructure.Persistence.Repositories;
using Services.Auth.Infrastructure.Services;

namespace Services.Auth.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("FashionStoreDb")
            ?? throw new InvalidOperationException("Missing connection string 'FashionStoreDb'.");

        services.AddDbContext<AuthDbContext>(options =>
            options.UseSqlServer(connectionString));

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IReadOnlyUserRepository, UserRepository>();
        services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
        services.AddScoped<IWishlistRepository, WishlistRepository>();
        services.AddScoped<IAddressRepository, AddressRepository>();
        services.AddScoped<IJwtService, JwtService>();

        return services;
    }
}
