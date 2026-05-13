using MediatR;
using Services.Ordering.Application.Abstractions.Persistence;
using Services.Ordering.Application.Features.Orders.Common;

namespace Services.Ordering.Application.Features.Orders.Queries.GetMyOrders;

public sealed class GetMyOrdersQueryHandler : IRequestHandler<GetMyOrdersQuery, IReadOnlyCollection<OrderResponse>>
{
    private readonly IOrderRepository _orderRepository;

    public GetMyOrdersQueryHandler(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public async Task<IReadOnlyCollection<OrderResponse>> Handle(GetMyOrdersQuery request, CancellationToken cancellationToken)
    {
        var orders = await _orderRepository.GetByUserIdAsync(request.UserId, cancellationToken);

        return orders
            .OrderByDescending(order => order.CreatedAtUtc)
            .Select(order => new OrderResponse(
                order.Id,
                order.OrderCode,
                order.UserId,
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
                    item.LineTotal)).ToArray()))
            .ToArray();
    }
}
