using BuldingBlock.Domain.Common;

namespace Services.Ordering.Domain.Entities;

public class Voucher : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string DiscountType { get; set; } = "percentage"; // percentage or fixed
    public decimal DiscountValue { get; set; }
    public decimal? MinOrderAmount { get; set; }
    public decimal? MaxDiscountAmount { get; set; }
    public int? TotalQuantity { get; set; }
    public int UsedQuantity { get; set; }
    public int? UsageLimit { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Status { get; set; } = "active"; // active, inactive, expired
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? UpdatedAt { get; set; }

    // Computed property
    public int? RemainingQuantity => TotalQuantity.HasValue ? TotalQuantity.Value - UsedQuantity : null;

    // Navigation properties
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    public virtual ICollection<VoucherUsage> VoucherUsages { get; set; } = new List<VoucherUsage>();

    // Business methods
    public bool IsValid()
    {
        return Status == "active" 
            && StartDate <= DateTime.Now 
            && EndDate >= DateTime.Now
            && (!TotalQuantity.HasValue || RemainingQuantity > 0);
    }

    public bool CanBeUsedBy(int userId, decimal orderAmount)
    {
        if (!IsValid()) return false;
        if (MinOrderAmount.HasValue && orderAmount < MinOrderAmount.Value) return false;
        
        // Check usage limit per user if needed
        // This would require checking VoucherUsages collection
        
        return true;
    }

    public decimal CalculateDiscount(decimal orderAmount)
    {
        if (!IsValid()) return 0;

        decimal discount = DiscountType == "percentage"
            ? orderAmount * DiscountValue / 100
            : DiscountValue;

        if (MaxDiscountAmount.HasValue && discount > MaxDiscountAmount.Value)
        {
            discount = MaxDiscountAmount.Value;
        }

        return discount;
    }

    public void Use()
    {
        UsedQuantity++;
        if (TotalQuantity.HasValue && UsedQuantity >= TotalQuantity.Value)
        {
            Status = "expired";
        }
    }
}
