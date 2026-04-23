using MediatR;
using Services.Ordering.Application.Abstractions.Persistence;
using Services.Ordering.Application.Features.Carts.Common;
using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Application.Features.Carts.Commands.AddCartItem;

public sealed class AddCartItemCommandHandler : IRequestHandler<AddCartItemCommand, CartResponse>
{
    private readonly ICartRepository _cartRepository;

    public AddCartItemCommandHandler(ICartRepository cartRepository)
    {
        _cartRepository = cartRepository;
    }

    public async Task<CartResponse> Handle(AddCartItemCommand request, CancellationToken cancellationToken)
    {
        var cart = await _cartRepository.GetOrCreateAsync(request.UserId, cancellationToken);
        cart.AddItem(new CartItem(request.ProductVariantId, request.Quantity, request.UnitPriceSnapshot));
        await _cartRepository.SaveChangesAsync(cancellationToken);

        return new CartResponse(
            cart.Id,
            cart.UserId,
            cart.UpdatedAt,
            cart.Items.Select(item => new CartItemResponse(
                item.Id,
                item.ProductVariantId,
                item.Quantity,
                item.UnitPriceSnapshot)).ToArray());
    }
}
