using MediatR;
using Services.Catalog.Application.Features.Lookups.Common;

namespace Services.Catalog.Application.Features.Lookups.Queries.GetProductReviews;

public sealed record GetProductReviewsQuery(int ProductId) : IRequest<IReadOnlyCollection<ReviewResponse>>;
