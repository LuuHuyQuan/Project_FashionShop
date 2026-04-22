using Microsoft.Extensions.DependencyInjection;

namespace BuildingBlocks.Application;

public interface ICommand<out TResponse>;
public interface IQuery<out TResponse>;

public interface ICommandHandler<in TCommand, TResponse> where TCommand : ICommand<TResponse>
{
    Task<TResponse> Handle(TCommand command, CancellationToken cancellationToken);
}

public interface IQueryHandler<in TQuery, TResponse> where TQuery : IQuery<TResponse>
{
    Task<TResponse> Handle(TQuery query, CancellationToken cancellationToken);
}

public interface IDispatcher
{
    Task<TResponse> Send<TResponse>(ICommand<TResponse> command, CancellationToken cancellationToken = default);
    Task<TResponse> Query<TResponse>(IQuery<TResponse> query, CancellationToken cancellationToken = default);
}

public sealed class Dispatcher(IServiceProvider serviceProvider) : IDispatcher
{
    public Task<TResponse> Send<TResponse>(ICommand<TResponse> command, CancellationToken cancellationToken = default)
    {
        var handlerType = typeof(ICommandHandler<,>).MakeGenericType(command.GetType(), typeof(TResponse));
        dynamic handler = serviceProvider.GetRequiredService(handlerType);
        return handler.Handle((dynamic)command, cancellationToken);
    }

    public Task<TResponse> Query<TResponse>(IQuery<TResponse> query, CancellationToken cancellationToken = default)
    {
        var handlerType = typeof(IQueryHandler<,>).MakeGenericType(query.GetType(), typeof(TResponse));
        dynamic handler = serviceProvider.GetRequiredService(handlerType);
        return handler.Handle((dynamic)query, cancellationToken);
    }
}

public static class DependencyInjection
{
    public static IServiceCollection AddDispatcher(this IServiceCollection services)
    {
        services.AddScoped<IDispatcher, Dispatcher>();
        return services;
    }
}
