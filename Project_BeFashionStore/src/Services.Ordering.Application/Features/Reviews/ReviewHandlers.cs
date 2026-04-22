using BuildingBlocks.Application;
using Services.Ordering.Application.Abstractions;
using Services.Ordering.Application.Contracts;
using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Application.Features.Reviews;

public sealed record CreateReviewCommand(int UserId, int ProductId, int Rating, string? Comment) : ICommand<ReviewDto>;
public sealed record UpdateReviewCommand(int Id, int Rating, string? Comment) : ICommand<ReviewDto>;
public sealed record DeleteReviewCommand(int Id) : ICommand<bool>;
public sealed record GetReviewsByProductQuery(int ProductId) : IQuery<IReadOnlyList<ReviewDto>>;

public sealed class CreateReviewCommandHandler(IOrderingDbContext dbContext) : ICommandHandler<CreateReviewCommand, ReviewDto>
{
    public async Task<ReviewDto> Handle(CreateReviewCommand command, CancellationToken cancellationToken)
    {
        var review = new Review
        {
            UserId = command.UserId,
            ProductId = command.ProductId,
            Rating = command.Rating,
            Comment = command.Comment,
            CreatedAt = DateTime.UtcNow
        };

        await dbContext.AddReviewAsync(review, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return OrderingMappings.MapReview(review);
    }
}

public sealed class UpdateReviewCommandHandler(IOrderingDbContext dbContext) : ICommandHandler<UpdateReviewCommand, ReviewDto>
{
    public async Task<ReviewDto> Handle(UpdateReviewCommand command, CancellationToken cancellationToken)
    {
        var review = dbContext.Reviews.FirstOrDefault(x => x.Id == command.Id)
            ?? throw new KeyNotFoundException("Review not found.");

        review.Rating = command.Rating;
        review.Comment = command.Comment;
        await dbContext.SaveChangesAsync(cancellationToken);
        return OrderingMappings.MapReview(review);
    }
}

public sealed class DeleteReviewCommandHandler(IOrderingDbContext dbContext) : ICommandHandler<DeleteReviewCommand, bool>
{
    public async Task<bool> Handle(DeleteReviewCommand command, CancellationToken cancellationToken)
    {
        var review = dbContext.Reviews.FirstOrDefault(x => x.Id == command.Id)
            ?? throw new KeyNotFoundException("Review not found.");

        dbContext.RemoveReview(review);
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }
}

public sealed class GetReviewsByProductQueryHandler(IOrderingDbContext dbContext) : IQueryHandler<GetReviewsByProductQuery, IReadOnlyList<ReviewDto>>
{
    public Task<IReadOnlyList<ReviewDto>> Handle(GetReviewsByProductQuery query, CancellationToken cancellationToken)
    {
        IReadOnlyList<ReviewDto> items = dbContext.Reviews
            .Where(x => x.ProductId == query.ProductId)
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new ReviewDto(x.Id, x.UserId, x.ProductId, x.Rating, x.Comment, x.CreatedAt))
            .ToList();

        return Task.FromResult(items);
    }
}
