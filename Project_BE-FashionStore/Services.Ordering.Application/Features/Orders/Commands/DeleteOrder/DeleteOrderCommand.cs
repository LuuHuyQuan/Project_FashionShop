using MediatR;

namespace Services.Ordering.Application.Features.Orders.Commands.DeleteOrder;

public record DeleteOrderCommand(int Id) : IRequest<bool>;
