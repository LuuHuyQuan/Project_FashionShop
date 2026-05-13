using MediatR;
using Services.Ordering.Application.Abstractions.Persistence;
using Services.Ordering.Application.Features.Orders.Common;

namespace Services.Ordering.Application.Features.Orders.Queries.GetOrderByCode;

public class GetOrderByCodeQueryHandler : IRequestHandler<GetOrderByCodeQuery, OrderResponse?>
{
    private readonly IOrderRepository _orderRepository;

    public GetOrderByCodeQueryHandler(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public async Task<OrderResponse?> Handle(GetOrderByCodeQuery request, CancellationToken cancellationToken)
    {
        var order = await _orderRepository.GetByOrderCodeAsync(request.OrderCode, cancellationToken);
        
        if (order == null)
            return null;
        
        var items = order.OrderItems.Select(item => new OrderItemResponse(
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
            items
        );
    }
}
