using Microsoft.EntityFrameworkCore;
using Services.Ordering.Application.Abstractions.Persistence;
using Services.Ordering.Domain.Entities;
using Services.Ordering.Infrastructure.Persistence;

namespace Services.Ordering.Infrastructure.Repositories;

public class VoucherRepository : IVoucherRepository
{
    private readonly OrderingDbContext _context;

    public VoucherRepository(OrderingDbContext context)
    {
        _context = context;
    }

    public async Task<Voucher?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Vouchers
            .Include(v => v.VoucherUsages)
            .FirstOrDefaultAsync(v => v.Id == id, cancellationToken);
    }

    public async Task<Voucher?> GetByCodeAsync(string code, CancellationToken cancellationToken = default)
    {
        return await _context.Vouchers
            .Include(v => v.VoucherUsages)
            .FirstOrDefaultAsync(v => v.Code == code, cancellationToken);
    }

    public async Task<IReadOnlyCollection<Voucher>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Vouchers
            .Include(v => v.VoucherUsages)
            .OrderByDescending(v => v.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<Voucher>> GetActiveVouchersAsync(CancellationToken cancellationToken = default)
    {
        var now = DateTime.Now;
        return await _context.Vouchers
            .Where(v => v.Status == "active" 
                && v.StartDate <= now 
                && v.EndDate >= now)
            .OrderBy(v => v.Name)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Voucher voucher, CancellationToken cancellationToken = default)
    {
        _context.Vouchers.Add(voucher);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Voucher voucher, CancellationToken cancellationToken = default)
    {
        voucher.UpdatedAt = DateTime.Now;
        _context.Vouchers.Update(voucher);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var voucher = await _context.Vouchers.FindAsync(new object[] { id }, cancellationToken);
        if (voucher != null)
        {
            _context.Vouchers.Remove(voucher);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    public async Task<bool> IsCodeExistsAsync(string code, int? excludeId = null, CancellationToken cancellationToken = default)
    {
        var query = _context.Vouchers.Where(v => v.Code == code);
        
        if (excludeId.HasValue)
        {
            query = query.Where(v => v.Id != excludeId.Value);
        }
        
        return await query.AnyAsync(cancellationToken);
    }

    public async Task<int> GetUserUsageCountAsync(int voucherId, int userId, CancellationToken cancellationToken = default)
    {
        return await _context.VoucherUsages
            .Where(vu => vu.VoucherId == voucherId && vu.UserId == userId)
            .CountAsync(cancellationToken);
    }
}
