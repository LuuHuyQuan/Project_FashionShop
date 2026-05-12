using MediatR;
using Services.Catalog.Application.Abstractions.Persistence;

namespace Services.Catalog.Application.Features.Categories.Commands.DeleteCategory;

public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand, bool>
{
    private readonly ICategoryRepository _categoryRepository;

    public DeleteCategoryCommandHandler(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<bool> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = await _categoryRepository.GetByIdAsync(request.Id);
        
        if (category == null)
            return false;

        // Check if category has products
        if (category.Products != null && category.Products.Any())
        {
            throw new InvalidOperationException($"Không thể xóa danh mục '{category.Name}' vì còn {category.Products.Count} sản phẩm đang sử dụng danh mục này.");
        }

        await _categoryRepository.DeleteAsync(request.Id);
        return true;
    }
}
