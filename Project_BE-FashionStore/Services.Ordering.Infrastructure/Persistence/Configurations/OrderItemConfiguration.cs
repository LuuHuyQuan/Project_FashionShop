using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Infrastructure.Persistence.Configurations;

public sealed class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.ToTable("OrderItems", "dbo");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id).ValueGeneratedOnAdd();

        builder.Property(x => x.OrderId)
            .IsRequired();

        builder.Property(x => x.ProductId)
            .IsRequired();

        builder.Property(x => x.ProductVariantId);

        builder.Property(x => x.ProductNameSnapshot)
            .HasColumnName("ProductNameSnapshot")
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.ColorSnapshot)
            .HasColumnName("ColorSnapshot")
            .HasMaxLength(50);

        builder.Property(x => x.SizeSnapshot)
            .HasColumnName("SizeSnapshot")
            .HasMaxLength(20);

        builder.Property(x => x.UnitPrice)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(x => x.Quantity)
            .IsRequired();

        builder.Property(x => x.LineTotal)
            .HasColumnType("decimal(18,2)")
            .IsRequired();
    }
}
