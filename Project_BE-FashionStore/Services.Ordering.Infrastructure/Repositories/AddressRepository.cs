using Microsoft.EntityFrameworkCore;
using Services.Ordering.Application.Abstractions.Persistence;
using Services.Ordering.Domain.Entities;
using Services.Ordering.Infrastructure.Persistence;

namespace Services.Ordering.Infrastructure.Repositories;

public class AddressRepository : IAddressRepository
{
    private readonly OrderingDbContext _context;

    public AddressRepository(OrderingDbContext context)
    {
        _context = context;
    }

    public async Task<Address?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Addresses
            .FirstOrDefaultAsync(a => a.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyCollection<Address>> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default)
    {
        return await _context.Addresses
            .Where(a => a.UserId == userId)
            .OrderByDescending(a => a.IsDefault)
            .ToListAsync(cancellationToken);
    }

    public async Task<Address?> GetDefaultAddressAsync(int userId, CancellationToken cancellationToken = default)
    {
        return await _context.Addresses
            .FirstOrDefaultAsync(a => a.UserId == userId && a.IsDefault, cancellationToken);
    }

    public async Task AddAsync(Address address, CancellationToken cancellationToken = default)
    {
        // If this is set as default, unset other defaults for this user
        if (address.IsDefault)
        {
            await UnsetOtherDefaultsAsync(address.UserId, address.Id, cancellationToken);
        }
        
        _context.Addresses.Add(address);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Address address, CancellationToken cancellationToken = default)
    {
        // If this is set as default, unset other defaults for this user
        if (address.IsDefault)
        {
            await UnsetOtherDefaultsAsync(address.UserId, address.Id, cancellationToken);
        }
        
        _context.Addresses.Update(address);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var address = await _context.Addresses.FindAsync(new object[] { id }, cancellationToken);
        if (address != null)
        {
            _context.Addresses.Remove(address);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    public async Task SetDefaultAsync(int addressId, int userId, CancellationToken cancellationToken = default)
    {
        // Unset all defaults for this user
        await UnsetOtherDefaultsAsync(userId, null, cancellationToken);
        
        // Set the specified address as default
        var address = await _context.Addresses.FindAsync(new object[] { addressId }, cancellationToken);
        if (address != null && address.UserId == userId)
        {
            address.IsDefault = true;
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    private async Task UnsetOtherDefaultsAsync(int userId, int? excludeAddressId = null, CancellationToken cancellationToken = default)
    {
        var query = _context.Addresses.Where(a => a.UserId == userId && a.IsDefault);
        
        if (excludeAddressId.HasValue)
        {
            query = query.Where(a => a.Id != excludeAddressId.Value);
        }
        
        var addresses = await query.ToListAsync(cancellationToken);
        foreach (var address in addresses)
        {
            address.IsDefault = false;
        }
    }
}
