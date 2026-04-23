using Microsoft.EntityFrameworkCore;
using Services.Auth.Application.Abstractions.Persistence;
using Services.Auth.Domain.Entities;

namespace Services.Auth.Infrastructure.Persistence.Repositories;

public sealed class AddressRepository : IAddressRepository
{
    private readonly AuthDbContext _dbContext;

    public AddressRepository(AuthDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyCollection<Address>> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Addresses
            .Where(x => x.UserId == userId)
            .OrderByDescending(x => x.IsDefault)
            .ToListAsync(cancellationToken);
    }

    public Task<Address?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return _dbContext.Addresses.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task AddAsync(Address address, CancellationToken cancellationToken = default)
    {
        await _dbContext.Addresses.AddAsync(address, cancellationToken);
    }

    public void Remove(Address address)
    {
        _dbContext.Addresses.Remove(address);
    }

    public Task SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return _dbContext.SaveChangesAsync(cancellationToken);
    }
}
