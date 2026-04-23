using MediatR;
using Services.Ordering.Application.Abstractions.Persistence;
using Services.Ordering.Application.Features.Orders.Common;

namespace Services.Ordering.Application.Features.Orders.Queries.GetOrders;

public class GetOrdersQueryHandler : IRequestHandler<GetOrdersQuery, IEnumerable<OrderResponse>>
{
    private readonly IOrderRepository _orderRepository;

    public GetOrdersQueryHandler(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public async Task<IEnumerable<OrderResponse>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
    {
        var orders = await _orderRepository.GetAllAsync(cancellationToken);
        
        return orders.Select(o =>
        {
            var items = o.OrderItems.Select(item => new OrderItemResponse(
                item.Id,
                item.ProductId,
                item.ProductVariantId,
                item.ProductNameSnapshot,
                item.ColorSnapshot,
                item.SizeSnapshot,
                item.UnitPrice,
                item.Quantity,
                item.LineTotal
            )).ToList();

            return new OrderResponse(
                o.Id,
                o.OrderCode,
                o.Status,
                o.PaymentMethod,
                o.PaymentStatus,
                o.ShippingName,
                o.ShippingPhone,
                o.ShippingEmail,
                o.ShippingAddress,
                o.City,
                o.District,
                o.Ward,
                o.Note,
                o.Subtotal,
                o.ShippingFee,
                o.DiscountAmount,
                o.TotalAmount,
                o.CreatedAtUtc,
                items
            );
        });
    }
}
