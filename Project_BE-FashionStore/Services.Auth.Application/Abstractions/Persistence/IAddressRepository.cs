using Services.Auth.Domain.Entities;

namespace Services.Auth.Application.Abstractions.Persistence;

public interface IAddressRepository
{
    Task<IReadOnlyCollection<Address>> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default);
    Task<Address?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task AddAsync(Address address, CancellationToken cancellationToken = default);
    void Remove(Address address);
    Task SaveChangesAsync(CancellationToken cancellationToken = default);
}
