using FluentValidation;
using MediatR;
using Services.Ordering.Application.Features.Orders.Common;

namespace Services.Ordering.Application.Features.Orders.Commands.Checkout;

public sealed record CheckoutItemRequest(
    int ProductId,
    int ProductVariantId,
    string ProductNameSnapshot,
    string ColorSnapshot,
    string SizeSnapshot,
    decimal UnitPrice,
    int Quantity);

public sealed record CheckoutCommand(
    int UserId,
    int? VoucherId,
    string ShippingName,
    string ShippingPhone,
    string ShippingEmail,
    string ShippingAddress,
    string? City,
    string? District,
    string? Ward,
    string? Note,
    string PaymentMethod,
    decimal ShippingFee,
    IReadOnlyCollection<CheckoutItemRequest> Items) : IRequest<OrderResponse>;

public sealed class CheckoutCommandValidator : AbstractValidator<CheckoutCommand>
{
    public CheckoutCommandValidator()
    {
        RuleFor(x => x.UserId).GreaterThan(0);
        RuleFor(x => x.ShippingName).NotEmpty().MaximumLength(200);
        RuleFor(x => x.ShippingPhone).NotEmpty().MaximumLength(20);
        RuleFor(x => x.ShippingEmail).NotEmpty().EmailAddress().MaximumLength(255);
        RuleFor(x => x.ShippingAddress).NotEmpty().MaximumLength(500);
        RuleFor(x => x.City).MaximumLength(100).When(x => !string.IsNullOrWhiteSpace(x.City));
        RuleFor(x => x.District).MaximumLength(100).When(x => !string.IsNullOrWhiteSpace(x.District));
        RuleFor(x => x.Ward).MaximumLength(100).When(x => !string.IsNullOrWhiteSpace(x.Ward));
        RuleFor(x => x.Note).MaximumLength(1000).When(x => !string.IsNullOrWhiteSpace(x.Note));
        RuleFor(x => x.PaymentMethod).NotEmpty().MaximumLength(20);
        RuleFor(x => x.ShippingFee).GreaterThanOrEqualTo(0);
        RuleFor(x => x.Items).NotEmpty();
        RuleForEach(x => x.Items).ChildRules(item =>
        {
            item.RuleFor(x => x.ProductId).GreaterThan(0);
            item.RuleFor(x => x.ProductVariantId).GreaterThan(0);
            item.RuleFor(x => x.ProductNameSnapshot).NotEmpty().MaximumLength(200);
            item.RuleFor(x => x.ColorSnapshot).NotEmpty().MaximumLength(50);
            item.RuleFor(x => x.SizeSnapshot).NotEmpty().MaximumLength(20);
            item.RuleFor(x => x.UnitPrice).GreaterThan(0);
            item.RuleFor(x => x.Quantity).GreaterThan(0);
        });
    }
}
