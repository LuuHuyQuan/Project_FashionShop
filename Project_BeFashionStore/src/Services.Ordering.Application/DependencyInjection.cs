using BuildingBlocks.Application;
using Microsoft.Extensions.DependencyInjection;
using Services.Ordering.Application.Contracts;
using Services.Ordering.Application.Features.Addresses;
using Services.Ordering.Application.Features.Carts;
using Services.Ordering.Application.Features.Orders;
using Services.Ordering.Application.Features.Reviews;
using Services.Ordering.Application.Features.WishlistItems;

namespace Services.Ordering.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddOrderingApplication(this IServiceCollection services)
    {
        services.AddDispatcher();

        services.AddScoped<ICommandHandler<CreateAddressCommand, AddressDto>, CreateAddressCommandHandler>();
        services.AddScoped<ICommandHandler<UpdateAddressCommand, AddressDto>, UpdateAddressCommandHandler>();
        services.AddScoped<ICommandHandler<DeleteAddressCommand, bool>, DeleteAddressCommandHandler>();
        services.AddScoped<IQueryHandler<GetAddressesByUserQuery, IReadOnlyList<AddressDto>>, GetAddressesByUserQueryHandler>();

        services.AddScoped<ICommandHandler<AddCartItemCommand, CartDto>, AddCartItemCommandHandler>();
        services.AddScoped<ICommandHandler<UpdateCartItemCommand, CartItemDto>, UpdateCartItemCommandHandler>();
        services.AddScoped<ICommandHandler<RemoveCartItemCommand, bool>, RemoveCartItemCommandHandler>();
        services.AddScoped<IQueryHandler<GetCartByUserQuery, CartDto>, GetCartByUserQueryHandler>();

        services.AddScoped<ICommandHandler<CreateOrderCommand, OrderDto>, CreateOrderCommandHandler>();
        services.AddScoped<ICommandHandler<UpdateOrderStatusCommand, OrderDto>, UpdateOrderStatusCommandHandler>();
        services.AddScoped<IQueryHandler<GetOrderByIdQuery, OrderDto>, GetOrderByIdQueryHandler>();
        services.AddScoped<IQueryHandler<GetOrdersByUserQuery, IReadOnlyList<OrderDto>>, GetOrdersByUserQueryHandler>();

        services.AddScoped<ICommandHandler<CreateReviewCommand, ReviewDto>, CreateReviewCommandHandler>();
        services.AddScoped<ICommandHandler<UpdateReviewCommand, ReviewDto>, UpdateReviewCommandHandler>();
        services.AddScoped<ICommandHandler<DeleteReviewCommand, bool>, DeleteReviewCommandHandler>();
        services.AddScoped<IQueryHandler<GetReviewsByProductQuery, IReadOnlyList<ReviewDto>>, GetReviewsByProductQueryHandler>();

        services.AddScoped<ICommandHandler<CreateWishlistItemCommand, WishlistItemDto>, CreateWishlistItemCommandHandler>();
        services.AddScoped<ICommandHandler<DeleteWishlistItemCommand, bool>, DeleteWishlistItemCommandHandler>();
        services.AddScoped<IQueryHandler<GetWishlistByUserQuery, IReadOnlyList<WishlistItemDto>>, GetWishlistByUserQueryHandler>();

        return services;
    }
}
