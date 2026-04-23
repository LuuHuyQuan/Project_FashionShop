using FluentValidation;
using MediatR;
using Services.Ordering.Application.Features.Carts.Common;

namespace Services.Ordering.Application.Features.Carts.Commands.AddCartItem;

public sealed record AddCartItemCommand(int UserId, int ProductVariantId, int Quantity, decimal UnitPriceSnapshot) : IRequest<CartResponse>;

public sealed class AddCartItemCommandValidator : AbstractValidator<AddCartItemCommand>
{
    public AddCartItemCommandValidator()
    {
        RuleFor(x => x.UserId).GreaterThan(0);
        RuleFor(x => x.ProductVariantId).GreaterThan(0);
        RuleFor(x => x.Quantity).GreaterThan(0);
        RuleFor(x => x.UnitPriceSnapshot).GreaterThan(0);
    }
}
