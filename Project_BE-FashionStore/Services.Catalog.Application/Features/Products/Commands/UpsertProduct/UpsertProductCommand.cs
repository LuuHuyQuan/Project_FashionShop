using FluentValidation;
using MediatR;
using Services.Catalog.Application.Features.Products.Common;

namespace Services.Catalog.Application.Features.Products.Commands.UpsertProduct;

public sealed record UpsertProductCommand(
    int? Id,
    int CategoryId,
    string Name,
    string Slug,
    string? Description,
    decimal Price,
    decimal? OldPrice,
    string? Badge,
    string Status) : IRequest<ProductResponse>;

public sealed class UpsertProductCommandValidator : AbstractValidator<UpsertProductCommand>
{
    public UpsertProductCommandValidator()
    {
        RuleFor(x => x.CategoryId).GreaterThan(0);
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Slug).NotEmpty().MaximumLength(220);
        RuleFor(x => x.Price).GreaterThan(0);
        RuleFor(x => x.OldPrice)
            .GreaterThan(0)
            .When(x => x.OldPrice.HasValue);
        RuleFor(x => x.Badge)
            .MaximumLength(50)
            .When(x => !string.IsNullOrWhiteSpace(x.Badge));
    }
}
