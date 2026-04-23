using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Abstractions.Persistence;

public interface IProductRepository
{
    Task<IReadOnlyCollection<Product>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Product?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<Product?> GetBySlugAsync(string slug, CancellationToken cancellationToken = default);
    Task AddAsync(Product product, CancellationToken cancellationToken = default);
    Task UpdateAsync(Product product, CancellationToken cancellationToken = default);
}
