using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Abstractions.Persistence;

public interface IColorRepository
{
    Task<IEnumerable<Color>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Color?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<Color> AddAsync(Color color, CancellationToken cancellationToken = default);
    Task UpdateAsync(Color color, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
}
