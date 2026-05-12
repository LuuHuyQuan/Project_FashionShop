using Microsoft.EntityFrameworkCore;
using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Infrastructure.Persistence;

public class OrderingDbContext : DbContext
{
    public OrderingDbContext(DbContextOptions<OrderingDbContext> options) : base(options) { }
    
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CartItem> CartItems { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Voucher> Vouchers { get; set; }
    public DbSet<VoucherUsage> VoucherUsages { get; set; }
    public DbSet<Address> Addresses { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Cart>(entity =>
        {
            entity.ToTable("Carts");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.UpdatedAt).IsRequired().HasDefaultValueSql("SYSUTCDATETIME()");
            entity.HasIndex(e => e.UserId).IsUnique();
        });
        
        modelBuilder.Entity<CartItem>(entity =>
        {
            entity.ToTable("CartItems");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Quantity).IsRequired();
            entity.Property(e => e.UnitPriceSnapshot).HasColumnType("decimal(18,2)").IsRequired();
            entity.HasIndex(e => e.CartId);
            entity.HasIndex(e => e.ProductVariantId);
            entity.HasOne(e => e.Cart)
                .WithMany(c => c.CartItems)
                .HasForeignKey(e => e.CartId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("Orders");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.OrderCode).HasMaxLength(50).IsRequired();
            entity.Property(e => e.Status).HasMaxLength(20).IsRequired().HasDefaultValue("pending");
            entity.Property(e => e.PaymentMethod).HasMaxLength(20).IsRequired().HasDefaultValue("COD");
            entity.Property(e => e.PaymentStatus).HasMaxLength(20).IsRequired().HasDefaultValue("pending");
            entity.Property(e => e.ShippingName).HasMaxLength(200).IsRequired();
            entity.Property(e => e.ShippingPhone).HasMaxLength(20).IsRequired();
            entity.Property(e => e.ShippingEmail).HasMaxLength(255).IsRequired();
            entity.Property(e => e.ShippingAddress).HasMaxLength(500).IsRequired();
            entity.Property(e => e.City).HasMaxLength(100);
            entity.Property(e => e.District).HasMaxLength(100);
            entity.Property(e => e.Ward).HasMaxLength(100);
            entity.Property(e => e.Note).HasMaxLength(1000);
            entity.Property(e => e.Subtotal).HasColumnType("decimal(18,2)").IsRequired();
            entity.Property(e => e.ShippingFee).HasColumnType("decimal(18,2)").IsRequired().HasDefaultValue(0);
            entity.Property(e => e.DiscountAmount).HasColumnType("decimal(18,2)").IsRequired().HasDefaultValue(0);
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(18,2)").IsRequired();
            entity.Property(e => e.CreatedAtUtc).HasColumnName("CreatedAt").IsRequired().HasDefaultValueSql("SYSUTCDATETIME()");
            entity.HasIndex(e => e.OrderCode).IsUnique();
            entity.HasIndex(e => e.UserId);
        });
        
        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.ToTable("OrderItems");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.ProductNameSnapshot).HasMaxLength(200).IsRequired();
            entity.Property(e => e.ColorSnapshot).HasMaxLength(50);
            entity.Property(e => e.SizeSnapshot).HasMaxLength(20);
            entity.Property(e => e.UnitPrice).HasColumnType("decimal(18,2)").IsRequired();
            entity.Property(e => e.Quantity).IsRequired();
            entity.Property(e => e.LineTotal).HasColumnType("decimal(18,2)").IsRequired();
            entity.HasIndex(e => e.OrderId);
            entity.HasIndex(e => e.ProductId);
            entity.HasOne(e => e.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(e => e.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        modelBuilder.Entity<Voucher>(entity =>
        {
            entity.ToTable("Vouchers");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Code).IsRequired().HasMaxLength(50);
            entity.HasIndex(e => e.Code).IsUnique();
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.DiscountType).IsRequired().HasMaxLength(20);
            entity.Property(e => e.DiscountValue).HasColumnType("decimal(18,2)").IsRequired();
            entity.Property(e => e.MinOrderAmount).HasColumnType("decimal(18,2)");
            entity.Property(e => e.MaxDiscountAmount).HasColumnType("decimal(18,2)");
            entity.Property(e => e.UsedQuantity).IsRequired().HasDefaultValue(0);
            entity.Property(e => e.Status).IsRequired().HasMaxLength(20).HasDefaultValue("active");
            entity.Property(e => e.StartDate).IsRequired();
            entity.Property(e => e.EndDate).IsRequired();
            entity.Property(e => e.CreatedAt).IsRequired().HasDefaultValueSql("SYSUTCDATETIME()");
            entity.Ignore(e => e.RemainingQuantity); // Computed property
            entity.HasCheckConstraint("CK_Vouchers_DiscountType", "[DiscountType] IN ('percentage', 'fixed')");
            entity.HasCheckConstraint("CK_Vouchers_Status", "[Status] IN ('active', 'inactive', 'expired')");
            entity.HasCheckConstraint("CK_Vouchers_Dates", "[EndDate] > [StartDate]");
        });
        
        modelBuilder.Entity<VoucherUsage>(entity =>
        {
            entity.ToTable("VoucherUsages");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.UsedAt).IsRequired().HasDefaultValueSql("SYSUTCDATETIME()");
            entity.HasIndex(e => e.VoucherId);
            entity.HasIndex(e => e.UserId);
            entity.HasIndex(e => e.OrderId);
            entity.HasOne(e => e.Voucher)
                .WithMany(v => v.VoucherUsages)
                .HasForeignKey(e => e.VoucherId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.Order)
                .WithMany()
                .HasForeignKey(e => e.OrderId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        
        modelBuilder.Entity<Address>(entity =>
        {
            entity.ToTable("Addresses");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.RecipientName).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Phone).IsRequired().HasMaxLength(20);
            entity.Property(e => e.AddressLine).IsRequired().HasMaxLength(500);
            entity.Property(e => e.City).HasMaxLength(100);
            entity.Property(e => e.District).HasMaxLength(100);
            entity.Property(e => e.Ward).HasMaxLength(100);
            entity.Property(e => e.IsDefault).IsRequired().HasDefaultValue(false);
            entity.HasIndex(e => e.UserId);
            entity.Ignore(e => e.FullAddress);
        });
    }
}
