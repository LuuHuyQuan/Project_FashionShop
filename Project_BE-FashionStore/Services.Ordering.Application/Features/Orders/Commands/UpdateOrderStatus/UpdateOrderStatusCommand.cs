using FluentValidation;
using MediatR;
using Services.Ordering.Application.Features.Orders.Common;

namespace Services.Ordering.Application.Features.Orders.Commands.UpdateOrderStatus;

public sealed record UpdateOrderStatusCommand(int OrderId, string Status) : IRequest<OrderResponse>;

public sealed class UpdateOrderStatusCommandValidator : AbstractValidator<UpdateOrderStatusCommand>
{
    public UpdateOrderStatusCommandValidator()
    {
        RuleFor(x => x.OrderId).GreaterThan(0);
        RuleFor(x => x.Status).NotEmpty();
    }
}
