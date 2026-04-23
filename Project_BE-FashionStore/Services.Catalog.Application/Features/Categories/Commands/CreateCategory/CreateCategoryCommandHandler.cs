using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Application.Features.Categories.Common;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Features.Categories.Commands.CreateCategory;

public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, CategoryResponse>
{
    private readonly ICategoryRepository _categoryRepository;

    public CreateCategoryCommandHandler(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<CategoryResponse> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = new Category
        {
            Name = request.Name,
            Slug = request.Slug,
            Description = request.Description,
            Status = request.Status
        };

        var created = await _categoryRepository.CreateAsync(category);
        
        return new CategoryResponse(
            created.Id,
            created.Name,
            created.Slug,
            created.Description,
            created.Status
        );
    }
}
