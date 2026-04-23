using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.Lookups.Common;

namespace Services.Catalog.Application.Features.Lookups.Queries.GetProductReviews;

public sealed class GetProductReviewsQueryHandler : IRequestHandler<GetProductReviewsQuery, IReadOnlyCollection<ReviewResponse>>
{
    private readonly ICatalogLookupRepository _lookupRepository;

    public GetProductReviewsQueryHandler(ICatalogLookupRepository lookupRepository)
    {
        _lookupRepository = lookupRepository;
    }

    public async Task<IReadOnlyCollection<ReviewResponse>> Handle(GetProductReviewsQuery request, CancellationToken cancellationToken)
    {
        var reviews = await _lookupRepository.GetProductReviewsAsync(request.ProductId, cancellationToken);
        return reviews.Select(x => new ReviewResponse(x.Id, x.UserId, x.ProductId, x.Rating, x.Comment, x.CreatedAt)).ToArray();
    }
}
