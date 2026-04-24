using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Services.Auth.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(cfg => 
        {
            cfg.RegisterServicesFromAssemblies(typeof(DependencyInjection).Assembly);
        });
        
        return services;
    }
}
