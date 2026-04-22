using BuildingBlocks.Application;
using Services.Ordering.Application.Abstractions;
using Services.Ordering.Application.Contracts;
using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Application.Features.WishlistItems;

public sealed record CreateWishlistItemCommand(int UserId, int ProductId) : ICommand<WishlistItemDto>;
public sealed record DeleteWishlistItemCommand(int Id) : ICommand<bool>;
public sealed record GetWishlistByUserQuery(int UserId) : IQuery<IReadOnlyList<WishlistItemDto>>;

public sealed class CreateWishlistItemCommandHandler(IOrderingDbContext dbContext) : ICommandHandler<CreateWishlistItemCommand, WishlistItemDto>
{
    public async Task<WishlistItemDto> Handle(CreateWishlistItemCommand command, CancellationToken cancellationToken)
    {
        var item = new WishlistItem
        {
            UserId = command.UserId,
            ProductId = command.ProductId,
            CreatedAt = DateTime.UtcNow
        };

        await dbContext.AddWishlistItemAsync(item, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return OrderingMappings.MapWishlistItem(item);
    }
}

public sealed class DeleteWishlistItemCommandHandler(IOrderingDbContext dbContext) : ICommandHandler<DeleteWishlistItemCommand, bool>
{
    public async Task<bool> Handle(DeleteWishlistItemCommand command, CancellationToken cancellationToken)
    {
        var item = dbContext.WishlistItems.FirstOrDefault(x => x.Id == command.Id)
            ?? throw new KeyNotFoundException("Wishlist item not found.");

        dbContext.RemoveWishlistItem(item);
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }
}

public sealed class GetWishlistByUserQueryHandler(IOrderingDbContext dbContext) : IQueryHandler<GetWishlistByUserQuery, IReadOnlyList<WishlistItemDto>>
{
    public Task<IReadOnlyList<WishlistItemDto>> Handle(GetWishlistByUserQuery query, CancellationToken cancellationToken)
    {
        IReadOnlyList<WishlistItemDto> items = dbContext.WishlistItems
            .Where(x => x.UserId == query.UserId)
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new WishlistItemDto(x.Id, x.UserId, x.ProductId, x.CreatedAt))
            .ToList();

        return Task.FromResult(items);
    }
}
