using MediatR;
using Services.Ordering.Application.Features.Orders.Common;

namespace Services.Ordering.Application.Features.Orders.Queries.GetOrderById;

public record GetOrderByIdQuery(int Id) : IRequest<OrderResponse?>;
