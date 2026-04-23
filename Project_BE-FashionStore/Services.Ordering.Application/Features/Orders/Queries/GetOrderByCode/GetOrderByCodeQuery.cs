using MediatR;
using Services.Ordering.Application.Features.Orders.Common;

namespace Services.Ordering.Application.Features.Orders.Queries.GetOrderByCode;

public record GetOrderByCodeQuery(string OrderCode) : IRequest<OrderResponse?>;
