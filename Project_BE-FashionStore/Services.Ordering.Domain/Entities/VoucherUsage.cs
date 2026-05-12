using BuldingBlock.Domain.Common;

namespace Services.Ordering.Domain.Entities;

public class VoucherUsage : BaseEntity
{
    public int VoucherId { get; set; }
    public int UserId { get; set; }
    public int OrderId { get; set; }
    public DateTime UsedAt { get; set; } = DateTime.Now;

    // Navigation properties
    public virtual Voucher Voucher { get; set; } = null!;
    public virtual Order Order { get; set; } = null!;
}
