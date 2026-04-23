using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Services.Ordering.Application.Abstractions.Persistence;
using Services.Ordering.Infrastructure.Persistence;
using Services.Ordering.Infrastructure.Repositories;

namespace Services.Ordering.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("FashionStoreDb")
            ?? throw new InvalidOperationException("Missing connection string 'FashionStoreDb'.");

        services.AddDbContext<OrderingDbContext>(options =>
            options.UseSqlServer(connectionString));

        services.AddScoped<Application.Abstractions.Persistence.IOrderRepository, OrderRepository>();
        services.AddScoped<Application.Abstractions.Persistence.ICartRepository, CartRepository>();

        return services;
    }
}
