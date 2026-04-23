using MediatR;
using Services.Ordering.Application.Features.Orders.Common;

namespace Services.Ordering.Application.Features.Orders.Queries.GetOrders;

public record GetOrdersQuery : IRequest<IEnumerable<OrderResponse>>;
