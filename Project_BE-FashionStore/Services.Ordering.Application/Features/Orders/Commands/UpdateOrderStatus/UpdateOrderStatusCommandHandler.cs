using MediatR;
using Services.Ordering.Application.Abstractions.Persistence;
using Services.Ordering.Application.Features.Orders.Common;

namespace Services.Ordering.Application.Features.Orders.Commands.UpdateOrderStatus;

public sealed class UpdateOrderStatusCommandHandler : IRequestHandler<UpdateOrderStatusCommand, OrderResponse>
{
    private readonly IOrderRepository _orderRepository;

    public UpdateOrderStatusCommandHandler(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public async Task<OrderResponse> Handle(UpdateOrderStatusCommand request, CancellationToken cancellationToken)
    {
        var order = await _orderRepository.GetByIdAsync(request.OrderId, cancellationToken)
            ?? throw new KeyNotFoundException($"Order {request.OrderId} was not found.");

        order.UpdateStatus(request.Status);
        await _orderRepository.UpdateAsync(order, cancellationToken);

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
            order.OrderItems.Select(item => new OrderItemResponse(
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
