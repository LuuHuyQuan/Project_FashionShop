using Microsoft.EntityFrameworkCore;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Domain.Entities;
using Services.Catalog.Infrastructure.Persistence;

namespace Services.Catalog.Infrastructure.Repositories;

public class ColorRepository : IColorRepository
{
    private readonly CatalogDbContext _context;

    public ColorRepository(CatalogDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Color>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Colors.ToListAsync(cancellationToken);
    }

    public async Task<Color?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Colors.FindAsync(new object[] { id }, cancellationToken);
    }

    public async Task<Color> AddAsync(Color color, CancellationToken cancellationToken = default)
    {
        _context.Colors.Add(color);
        await _context.SaveChangesAsync(cancellationToken);
        return color;
    }

    public async Task UpdateAsync(Color color, CancellationToken cancellationToken = default)
    {
        _context.Colors.Update(color);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var color = await GetByIdAsync(id, cancellationToken);
        if (color != null)
        {
            _context.Colors.Remove(color);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
