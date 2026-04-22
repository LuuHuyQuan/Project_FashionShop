using BuildingBlocks.Application;
using Services.Ordering.Application.Abstractions;
using Services.Ordering.Application.Contracts;
using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Application.Features.Carts;

public sealed record AddCartItemCommand(int UserId, int ProductVariantId, int Quantity, decimal UnitPriceSnapshot) : ICommand<CartDto>;
public sealed record UpdateCartItemCommand(int Id, int Quantity, decimal UnitPriceSnapshot) : ICommand<CartItemDto>;
public sealed record RemoveCartItemCommand(int Id) : ICommand<bool>;
public sealed record GetCartByUserQuery(int UserId) : IQuery<CartDto>;

public sealed class AddCartItemCommandHandler(IOrderingDbContext dbContext) : ICommandHandler<AddCartItemCommand, CartDto>
{
    public async Task<CartDto> Handle(AddCartItemCommand command, CancellationToken cancellationToken)
    {
        var cart = dbContext.Carts.FirstOrDefault(x => x.UserId == command.UserId);
        if (cart is null)
        {
            cart = new Cart { UserId = command.UserId, UpdatedAt = DateTime.UtcNow };
            await dbContext.AddCartAsync(cart, cancellationToken);
            await dbContext.SaveChangesAsync(cancellationToken);
        }

        var item = new CartItem
        {
            CartId = cart.Id,
            ProductVariantId = command.ProductVariantId,
            Quantity = command.Quantity,
            UnitPriceSnapshot = command.UnitPriceSnapshot
        };

        await dbContext.AddCartItemAsync(item, cancellationToken);
        cart.UpdatedAt = DateTime.UtcNow;
        await dbContext.SaveChangesAsync(cancellationToken);
        return OrderingMappings.MapCart(cart);
    }
}

public sealed class UpdateCartItemCommandHandler(IOrderingDbContext dbContext) : ICommandHandler<UpdateCartItemCommand, CartItemDto>
{
    public async Task<CartItemDto> Handle(UpdateCartItemCommand command, CancellationToken cancellationToken)
    {
        var item = dbContext.CartItems.FirstOrDefault(x => x.Id == command.Id)
            ?? throw new KeyNotFoundException("Cart item not found.");

        item.Quantity = command.Quantity;
        item.UnitPriceSnapshot = command.UnitPriceSnapshot;
        await dbContext.SaveChangesAsync(cancellationToken);
        return new CartItemDto(item.Id, item.CartId, item.ProductVariantId, item.Quantity, item.UnitPriceSnapshot);
    }
}

public sealed class RemoveCartItemCommandHandler(IOrderingDbContext dbContext) : ICommandHandler<RemoveCartItemCommand, bool>
{
    public async Task<bool> Handle(RemoveCartItemCommand command, CancellationToken cancellationToken)
    {
        var item = dbContext.CartItems.FirstOrDefault(x => x.Id == command.Id)
            ?? throw new KeyNotFoundException("Cart item not found.");

        dbContext.RemoveCartItem(item);
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }
}

public sealed class GetCartByUserQueryHandler(IOrderingDbContext dbContext) : IQueryHandler<GetCartByUserQuery, CartDto>
{
    public Task<CartDto> Handle(GetCartByUserQuery query, CancellationToken cancellationToken)
    {
        var cart = dbContext.Carts.FirstOrDefault(x => x.UserId == query.UserId)
            ?? new Cart { UserId = query.UserId, UpdatedAt = DateTime.UtcNow };

        return Task.FromResult(OrderingMappings.MapCart(cart));
    }
}
