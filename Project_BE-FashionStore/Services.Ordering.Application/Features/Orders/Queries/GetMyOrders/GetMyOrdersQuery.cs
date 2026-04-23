using MediatR;
using Services.Ordering.Application.Features.Orders.Common;

namespace Services.Ordering.Application.Features.Orders.Queries.GetMyOrders;

public sealed record GetMyOrdersQuery(int UserId) : IRequest<IReadOnlyCollection<OrderResponse>>;
