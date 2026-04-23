using Microsoft.EntityFrameworkCore;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Domain.Entities;
using Services.Catalog.Infrastructure.Persistence;

namespace Services.Catalog.Infrastructure.Repositories;

public class SizeRepository : ISizeRepository
{
    private readonly CatalogDbContext _context;

    public SizeRepository(CatalogDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Size>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Sizes.ToListAsync(cancellationToken);
    }

    public async Task<Size?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Sizes.FindAsync(new object[] { id }, cancellationToken);
    }

    public async Task<Size> AddAsync(Size size, CancellationToken cancellationToken = default)
    {
        _context.Sizes.Add(size);
        await _context.SaveChangesAsync(cancellationToken);
        return size;
    }

    public async Task UpdateAsync(Size size, CancellationToken cancellationToken = default)
    {
        _context.Sizes.Update(size);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var size = await GetByIdAsync(id, cancellationToken);
        if (size != null)
        {
            _context.Sizes.Remove(size);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
