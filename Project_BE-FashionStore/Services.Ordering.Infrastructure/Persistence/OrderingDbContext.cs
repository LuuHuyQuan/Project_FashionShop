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
            entity.Property(e => e.CreatedAt).IsRequired().HasDefaultValueSql("SYSUTCDATETIME()");
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
    }
}
