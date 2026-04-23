using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Infrastructure.Persistence;
using Services.Catalog.Infrastructure.Repositories;

namespace Services.Catalog.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("FashionStoreDb")
            ?? throw new InvalidOperationException("Missing connection string 'FashionStoreDb'.");

        services.AddDbContext<CatalogDbContext>(options =>
            options.UseSqlServer(connectionString));

        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<ICatalogLookupRepository, CatalogLookupRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<IProductVariantRepository, ProductVariantRepository>();
        services.AddScoped<IProductImageRepository, ProductImageRepository>();
        services.AddScoped<IColorRepository, ColorRepository>();
        services.AddScoped<ISizeRepository, SizeRepository>();
        
        return services;
    }
}
