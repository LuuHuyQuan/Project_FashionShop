using MediatR;
using Services.Ordering.Application.Abstractions.Persistence;
using Services.Ordering.Application.Features.Orders.Common;
using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Application.Features.Orders.Commands.Checkout;

public sealed class CheckoutCommandHandler : IRequestHandler<CheckoutCommand, OrderResponse>
{
    private readonly IOrderRepository _orderRepository;

    public CheckoutCommandHandler(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public async Task<OrderResponse> Handle(CheckoutCommand request, CancellationToken cancellationToken)
    {
        var items = request.Items
            .Select(item => new OrderItem(
                item.ProductId,
                item.ProductNameSnapshot,
                item.UnitPrice,
                item.Quantity,
                item.ProductVariantId,
                item.ColorSnapshot,
                item.SizeSnapshot))
            .ToArray();

        var orderCode = $"ORD-{DateTime.UtcNow:yyyyMMddHHmmss}";
        var order = new Order(
            0,
            orderCode,
            request.UserId,
            request.ShippingName,
            request.ShippingPhone,
            request.ShippingEmail,
            request.ShippingAddress,
            request.PaymentMethod,
            request.PaymentStatus,
            request.ShippingFee,
            request.DiscountAmount,
            items,
            request.City,
            request.District,
            request.Ward,
            request.Note);

        await _orderRepository.AddAsync(order, cancellationToken);

        return Map(order);
    }

    private static OrderResponse Map(Order order)
    {
        return new OrderResponse(
            order.Id,
            order.OrderCode,
            order.Status,
            order.PaymentMethod,
            order.PaymentStatus,
            order.ShippingName,
            order.ShippingPhone,
            order.ShippingEmail,
            order.ShippingAddress,
            order.City,
            order.District,
            order.Ward,
            order.Note,
            order.Subtotal,
            order.ShippingFee,
            order.DiscountAmount,
            order.TotalAmount,
            order.CreatedAtUtc,
            order.Items.Select(item => new OrderItemResponse(
                item.Id,
                item.ProductId,
                item.ProductVariantId,
                item.ProductNameSnapshot,
                item.ColorSnapshot,
                item.SizeSnapshot,
                item.UnitPrice,
                item.Quantity,
                item.LineTotal)).ToArray());
    }
}
