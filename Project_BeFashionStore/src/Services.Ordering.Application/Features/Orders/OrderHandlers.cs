using BuildingBlocks.Application;
using Services.Ordering.Application.Abstractions;
using Services.Ordering.Application.Contracts;
using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Application.Features.Orders;

public sealed record CreateOrderItemRequest(int ProductId, int? ProductVariantId, string ProductNameSnapshot, string? ColorSnapshot, string? SizeSnapshot, decimal UnitPrice, int Quantity, decimal LineTotal);

public sealed record CreateOrderCommand(
    int UserId,
    string Status,
    string PaymentMethod,
    string PaymentStatus,
    string ShippingName,
    string ShippingPhone,
    string ShippingEmail,
    string ShippingAddress,
    string? City,
    string? District,
    string? Ward,
    string? Note,
    decimal Subtotal,
    decimal ShippingFee,
    decimal DiscountAmount,
    decimal TotalAmount,
    IReadOnlyList<CreateOrderItemRequest> Items) : ICommand<OrderDto>;

public sealed record UpdateOrderStatusCommand(int Id, string Status, string PaymentStatus) : ICommand<OrderDto>;
public sealed record GetOrderByIdQuery(int Id) : IQuery<OrderDto>;
public sealed record GetOrdersByUserQuery(int UserId) : IQuery<IReadOnlyList<OrderDto>>;

public sealed class CreateOrderCommandHandler(IOrderingDbContext dbContext) : ICommandHandler<CreateOrderCommand, OrderDto>
{
    public async Task<OrderDto> Handle(CreateOrderCommand command, CancellationToken cancellationToken)
    {
        var order = new Order
        {
            OrderCode = $"ORD-{DateTime.UtcNow:yyyyMMddHHmmss}-{Random.Shared.Next(100, 999)}",
            UserId = command.UserId,
            Status = string.IsNullOrWhiteSpace(command.Status) ? "pending" : command.Status.Trim().ToLowerInvariant(),
            PaymentMethod = string.IsNullOrWhiteSpace(command.PaymentMethod) ? "COD" : command.PaymentMethod.Trim(),
            PaymentStatus = string.IsNullOrWhiteSpace(command.PaymentStatus) ? "pending" : command.PaymentStatus.Trim().ToLowerInvariant(),
            ShippingName = command.ShippingName.Trim(),
            ShippingPhone = command.ShippingPhone.Trim(),
            ShippingEmail = command.ShippingEmail.Trim(),
            ShippingAddress = command.ShippingAddress.Trim(),
            City = command.City,
            District = command.District,
            Ward = command.Ward,
            Note = command.Note,
            Subtotal = command.Subtotal,
            ShippingFee = command.ShippingFee,
            DiscountAmount = command.DiscountAmount,
            TotalAmount = command.TotalAmount,
            CreatedAt = DateTime.UtcNow
        };

        await dbContext.AddOrderAsync(order, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);

        foreach (var item in command.Items)
        {
            await dbContext.AddOrderItemAsync(new OrderItem
            {
                OrderId = order.Id,
                ProductId = item.ProductId,
                ProductVariantId = item.ProductVariantId,
                ProductNameSnapshot = item.ProductNameSnapshot,
                ColorSnapshot = item.ColorSnapshot,
                SizeSnapshot = item.SizeSnapshot,
                UnitPrice = item.UnitPrice,
                Quantity = item.Quantity,
                LineTotal = item.LineTotal
            }, cancellationToken);
        }

        await dbContext.SaveChangesAsync(cancellationToken);
        return OrderingMappings.MapOrder(dbContext.Orders.First(x => x.Id == order.Id));
    }
}

public sealed class UpdateOrderStatusCommandHandler(IOrderingDbContext dbContext) : ICommandHandler<UpdateOrderStatusCommand, OrderDto>
{
    public async Task<OrderDto> Handle(UpdateOrderStatusCommand command, CancellationToken cancellationToken)
    {
        var order = dbContext.Orders.FirstOrDefault(x => x.Id == command.Id)
            ?? throw new KeyNotFoundException("Order not found.");

        order.Status = command.Status.Trim().ToLowerInvariant();
        order.PaymentStatus = command.PaymentStatus.Trim().ToLowerInvariant();
        await dbContext.SaveChangesAsync(cancellationToken);
        return OrderingMappings.MapOrder(order);
    }
}

public sealed class GetOrderByIdQueryHandler(IOrderingDbContext dbContext) : IQueryHandler<GetOrderByIdQuery, OrderDto>
{
    public Task<OrderDto> Handle(GetOrderByIdQuery query, CancellationToken cancellationToken)
    {
        var order = dbContext.Orders.FirstOrDefault(x => x.Id == query.Id)
            ?? throw new KeyNotFoundException("Order not found.");

        return Task.FromResult(OrderingMappings.MapOrder(order));
    }
}

public sealed class GetOrdersByUserQueryHandler(IOrderingDbContext dbContext) : IQueryHandler<GetOrdersByUserQuery, IReadOnlyList<OrderDto>>
{
    public Task<IReadOnlyList<OrderDto>> Handle(GetOrdersByUserQuery query, CancellationToken cancellationToken)
    {
        IReadOnlyList<OrderDto> items = dbContext.Orders
            .Where(x => x.UserId == query.UserId)
            .OrderByDescending(x => x.Id)
            .ToList()
            .Select(OrderingMappings.MapOrder)
            .ToList();

        return Task.FromResult(items);
    }
}
