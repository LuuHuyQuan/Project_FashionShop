using MediatR;
using Services.Ordering.Application.Abstractions.Persistence;
using Services.Ordering.Application.Features.Carts.Common;

namespace Services.Ordering.Application.Features.Carts.Queries.GetMyCart;

public sealed class GetMyCartQueryHandler : IRequestHandler<GetMyCartQuery, CartResponse>
{
    private readonly ICartRepository _cartRepository;

    public GetMyCartQueryHandler(ICartRepository cartRepository)
    {
        _cartRepository = cartRepository;
    }

    public async Task<CartResponse> Handle(GetMyCartQuery request, CancellationToken cancellationToken)
    {
        var cart = await _cartRepository.GetOrCreateAsync(request.UserId, cancellationToken);

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
