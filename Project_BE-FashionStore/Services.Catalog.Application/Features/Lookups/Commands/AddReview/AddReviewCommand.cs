using FluentValidation;
using MediatR;
using Services.Catalog.Application.Features.Lookups.Common;

namespace Services.Catalog.Application.Features.Lookups.Commands.AddReview;

public sealed record AddReviewCommand(int UserId, int ProductId, int Rating, string? Comment) : IRequest<ReviewResponse>;

public sealed class AddReviewCommandValidator : AbstractValidator<AddReviewCommand>
{
    public AddReviewCommandValidator()
    {
        RuleFor(x => x.UserId).GreaterThan(0);
        RuleFor(x => x.ProductId).GreaterThan(0);
        RuleFor(x => x.Rating).InclusiveBetween(1, 5);
        RuleFor(x => x.Comment).MaximumLength(2000).When(x => !string.IsNullOrWhiteSpace(x.Comment));
    }
}
