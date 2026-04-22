using BuildingBlocks.Application;
using Services.Catalog.Application.Abstractions;
using Services.Catalog.Application.Contracts;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Features.Categories;

public sealed record CreateCategoryCommand(string Name, string Slug, string? Description, string Status) : ICommand<CategoryDto>;
public sealed record UpdateCategoryCommand(int Id, string Name, string Slug, string? Description, string Status) : ICommand<CategoryDto>;
public sealed record DeleteCategoryCommand(int Id) : ICommand<bool>;
public sealed record GetCategoryByIdQuery(int Id) : IQuery<CategoryDto>;
public sealed record GetCategoriesQuery() : IQuery<IReadOnlyList<CategoryDto>>;

public sealed class CreateCategoryCommandHandler(ICatalogDbContext dbContext) : ICommandHandler<CreateCategoryCommand, CategoryDto>
{
    public async Task<CategoryDto> Handle(CreateCategoryCommand command, CancellationToken cancellationToken)
    {
        var entity = new Category
        {
            Name = command.Name.Trim(),
            Slug = command.Slug.Trim().ToLowerInvariant(),
            Description = command.Description,
            Status = string.IsNullOrWhiteSpace(command.Status) ? "active" : command.Status.Trim().ToLowerInvariant()
        };

        await dbContext.AddCategoryAsync(entity, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return Map(entity);
    }

    internal static CategoryDto Map(Category entity) => new(entity.Id, entity.Name, entity.Slug, entity.Description, entity.Status);
}

public sealed class UpdateCategoryCommandHandler(ICatalogDbContext dbContext) : ICommandHandler<UpdateCategoryCommand, CategoryDto>
{
    public async Task<CategoryDto> Handle(UpdateCategoryCommand command, CancellationToken cancellationToken)
    {
        var entity = dbContext.Categories.FirstOrDefault(x => x.Id == command.Id)
            ?? throw new KeyNotFoundException("Category not found.");

        entity.Name = command.Name.Trim();
        entity.Slug = command.Slug.Trim().ToLowerInvariant();
        entity.Description = command.Description;
        entity.Status = string.IsNullOrWhiteSpace(command.Status) ? entity.Status : command.Status.Trim().ToLowerInvariant();

        await dbContext.SaveChangesAsync(cancellationToken);
        return CreateCategoryCommandHandler.Map(entity);
    }
}

public sealed class DeleteCategoryCommandHandler(ICatalogDbContext dbContext) : ICommandHandler<DeleteCategoryCommand, bool>
{
    public async Task<bool> Handle(DeleteCategoryCommand command, CancellationToken cancellationToken)
    {
        var entity = dbContext.Categories.FirstOrDefault(x => x.Id == command.Id)
            ?? throw new KeyNotFoundException("Category not found.");

        dbContext.RemoveCategory(entity);
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }
}

public sealed class GetCategoryByIdQueryHandler(ICatalogDbContext dbContext) : IQueryHandler<GetCategoryByIdQuery, CategoryDto>
{
    public Task<CategoryDto> Handle(GetCategoryByIdQuery query, CancellationToken cancellationToken)
    {
        var entity = dbContext.Categories.FirstOrDefault(x => x.Id == query.Id)
            ?? throw new KeyNotFoundException("Category not found.");

        return Task.FromResult(CreateCategoryCommandHandler.Map(entity));
    }
}

public sealed class GetCategoriesQueryHandler(ICatalogDbContext dbContext) : IQueryHandler<GetCategoriesQuery, IReadOnlyList<CategoryDto>>
{
    public Task<IReadOnlyList<CategoryDto>> Handle(GetCategoriesQuery query, CancellationToken cancellationToken)
    {
        IReadOnlyList<CategoryDto> items = dbContext.Categories
            .OrderBy(x => x.Name)
            .Select(x => new CategoryDto(x.Id, x.Name, x.Slug, x.Description, x.Status))
            .ToList();

        return Task.FromResult(items);
    }
}
