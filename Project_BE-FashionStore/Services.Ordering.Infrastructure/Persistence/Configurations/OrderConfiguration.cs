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

        builder.Property(x => x.Id).ValueGeneratedOnAdd();

        builder.Property(x => x.OrderCode)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.UserId)
            .IsRequired();

        builder.Property(x => x.Status)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.PaymentMethod)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.PaymentStatus)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.ShippingName)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.ShippingPhone)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.ShippingEmail)
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(x => x.ShippingAddress)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(x => x.City)
            .HasMaxLength(100);

        builder.Property(x => x.District)
            .HasMaxLength(100);

        builder.Property(x => x.Ward)
            .HasMaxLength(100);

        builder.Property(x => x.Note)
            .HasMaxLength(1000);

        builder.Property(x => x.Subtotal)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(x => x.ShippingFee)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(x => x.DiscountAmount)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(x => x.TotalAmount)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(x => x.CreatedAtUtc)
            .HasColumnName("CreatedAt")
            .IsRequired();

        builder.HasIndex(x => x.OrderCode)
            .IsUnique();

        builder.HasMany(x => x.OrderItems)
            .WithOne(x => x.Order)
            .HasForeignKey(x => x.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
