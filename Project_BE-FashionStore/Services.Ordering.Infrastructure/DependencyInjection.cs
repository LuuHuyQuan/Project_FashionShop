using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Services.Ordering.Application.Abstractions.Persistence;
using Services.Ordering.Domain.Entities;
using Services.Ordering.Infrastructure.Persistence;

namespace Services.Ordering.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("FashionStoreDb")
            ?? throw new InvalidOperationException("Missing connection string 'FashionStoreDb'.");

        services.AddDbContext<OrderingDbContext>(options =>
            options.UseSqlServer(connectionString));

        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<ICartRepository, CartRepository>();

        return services;
    }

    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<OrderingDbContext>();
        await dbContext.Database.EnsureCreatedAsync();

        if (!await dbContext.Carts.AnyAsync())
        {
            var cart = new Cart(1);
            cart.AddItem(new CartItem(1, 2, 199000));
            cart.AddItem(new CartItem(2, 1, 499000));
            await dbContext.Carts.AddAsync(cart);
        }

        if (!await dbContext.Orders.AnyAsync())
        {
            var orders = new[]
            {
                new Order(
                    0,
                    "ORD-20260423-0001",
                    1,
                    "Admin FashionStore",
                    "0900000000",
                    "admin@fashionstore.vn",
                    "123 Nguyen Trai, District 1, HCMC",
                    "COD",
                    "pending",
                    30000,
                    0,
                    [
                        new OrderItem(1, "Basic T-Shirt", 199000, 2),
                        new OrderItem(2, "Slim Fit Jeans", 499000, 1)
                    ],
                    city: "HCMC",
                    district: "District 1",
                    ward: "Ward 1",
                    note: "Seed order")
            };

            await dbContext.Orders.AddRangeAsync(orders);
        }

        await dbContext.SaveChangesAsync();
    }
}
