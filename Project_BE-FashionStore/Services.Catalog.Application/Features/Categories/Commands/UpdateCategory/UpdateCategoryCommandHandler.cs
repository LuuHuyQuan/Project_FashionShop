using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;

namespace Services.Catalog.Application.Features.Categories.Commands.UpdateCategory;

public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, bool>
{
    private readonly ICategoryRepository _categoryRepository;

    public UpdateCategoryCommandHandler(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<bool> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = await _categoryRepository.GetByIdAsync(request.Id);
        
        if (category == null)
            return false;

        category.Name = request.Name;
        category.Slug = request.Slug;
        category.Description = request.Description;
        category.Status = request.Status;

        await _categoryRepository.UpdateAsync(category);
        return true;
    }
}
