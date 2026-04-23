using FluentValidation;
using MediatR;
using Services.Auth.Application.Features.Wishlist.Common;

namespace Services.Auth.Application.Features.Wishlist.Commands.AddWishlistItem;

public sealed record AddWishlistItemCommand(int UserId, int ProductId) : IRequest<WishlistItemResponse>;

public sealed class AddWishlistItemCommandValidator : AbstractValidator<AddWishlistItemCommand>
{
    public AddWishlistItemCommandValidator()
    {
        RuleFor(x => x.UserId).GreaterThan(0);
        RuleFor(x => x.ProductId).GreaterThan(0);
    }
}
