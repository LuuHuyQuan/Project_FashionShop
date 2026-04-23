using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.Lookups.Common;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Features.Lookups.Commands.AddReview;

public sealed class AddReviewCommandHandler : IRequestHandler<AddReviewCommand, ReviewResponse>
{
    private readonly ICatalogLookupRepository _lookupRepository;

    public AddReviewCommandHandler(ICatalogLookupRepository lookupRepository)
    {
        _lookupRepository = lookupRepository;
    }

    public async Task<ReviewResponse> Handle(AddReviewCommand request, CancellationToken cancellationToken)
    {
        var review = new Review(request.UserId, request.ProductId, request.Rating, request.Comment);
        await _lookupRepository.AddReviewAsync(review, cancellationToken);
        await _lookupRepository.SaveChangesAsync(cancellationToken);

        return new ReviewResponse(review.Id, review.UserId, review.ProductId, review.Rating, review.Comment, review.CreatedAt);
    }
}
