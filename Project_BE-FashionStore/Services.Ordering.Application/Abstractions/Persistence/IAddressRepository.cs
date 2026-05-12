using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Application.Abstractions.Persistence;

public interface IAddressRepository
{
    Task<Address?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<IReadOnlyCollection<Address>> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default);
    Task<Address?> GetDefaultAddressAsync(int userId, CancellationToken cancellationToken = default);
    Task AddAsync(Address address, CancellationToken cancellationToken = default);
    Task UpdateAsync(Address address, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
    Task SetDefaultAsync(int addressId, int userId, CancellationToken cancellationToken = default);
}
