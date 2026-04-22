using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Infrastructure.Persistence.Configurations;

public sealed class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Orders", "dbo");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.OrderCode).HasMaxLength(50).IsRequired();
        builder.Property(x => x.Status).HasMaxLength(20).HasDefaultValue("pending").IsRequired();
        builder.Property(x => x.PaymentMethod).HasMaxLength(20).HasDefaultValue("COD").IsRequired();
        builder.Property(x => x.PaymentStatus).HasMaxLength(20).HasDefaultValue("pending").IsRequired();
        builder.Property(x => x.ShippingName).HasMaxLength(200).IsRequired();
        builder.Property(x => x.ShippingPhone).HasMaxLength(20).IsRequired();
        builder.Property(x => x.ShippingEmail).HasMaxLength(255).IsRequired();
        builder.Property(x => x.ShippingAddress).HasMaxLength(500).IsRequired();
        builder.Property(x => x.Note).HasMaxLength(1000);
        builder.Property(x => x.Subtotal).HasColumnType("decimal(18,2)");
        builder.Property(x => x.ShippingFee).HasColumnType("decimal(18,2)");
        builder.Property(x => x.DiscountAmount).HasColumnType("decimal(18,2)");
        builder.Property(x => x.TotalAmount).HasColumnType("decimal(18,2)");
        builder.HasIndex(x => x.OrderCode).IsUnique();
    }
}
