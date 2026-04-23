using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Abstractions.Persistence;

public interface ISizeRepository
{
    Task<IEnumerable<Size>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Size?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<Size> AddAsync(Size size, CancellationToken cancellationToken = default);
    Task UpdateAsync(Size size, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
}
