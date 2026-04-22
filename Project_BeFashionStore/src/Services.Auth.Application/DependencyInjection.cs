using Microsoft.Extensions.DependencyInjection;
using BuildingBlocks.Application;
using Services.Auth.Application.Features.Login;
using Services.Auth.Application.Features.Me;
using Services.Auth.Application.Features.Register;

namespace Services.Auth.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddAuthApplication(this IServiceCollection services)
    {
        services.AddDispatcher();
        services.AddScoped<ICommandHandler<RegisterCommand, Contracts.AuthResponseDto>, RegisterCommandHandler>();
        services.AddScoped<ICommandHandler<LoginCommand, Contracts.AuthResponseDto>, LoginCommandHandler>();
        services.AddScoped<IQueryHandler<GetCurrentUserQuery, Contracts.AuthUserDto>, GetCurrentUserQueryHandler>();
        return services;
    }
}
