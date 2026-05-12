using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Application.Abstractions.Persistence;

public interface IVoucherRepository
{
    Task<Voucher?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<Voucher?> GetByCodeAsync(string code, CancellationToken cancellationToken = default);
    Task<IReadOnlyCollection<Voucher>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<IReadOnlyCollection<Voucher>> GetActiveVouchersAsync(CancellationToken cancellationToken = default);
    Task AddAsync(Voucher voucher, CancellationToken cancellationToken = default);
    Task UpdateAsync(Voucher voucher, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
    Task<bool> IsCodeExistsAsync(string code, int? excludeId = null, CancellationToken cancellationToken = default);
    Task<int> GetUserUsageCountAsync(int voucherId, int userId, CancellationToken cancellationToken = default);
}
