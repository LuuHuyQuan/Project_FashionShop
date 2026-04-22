using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Infrastructure.Persistence.Configurations;

public sealed class ProductVariantConfiguration : IEntityTypeConfiguration<ProductVariant>
{
    public void Configure(EntityTypeBuilder<ProductVariant> builder)
    {
        builder.ToTable("ProductVariants", "dbo");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.SKU).HasMaxLength(80).IsRequired();
        builder.Property(x => x.PriceOverride).HasColumnType("decimal(18,2)");
        builder.HasIndex(x => x.SKU).IsUnique();
        builder.HasOne(x => x.Product)
            .WithMany(x => x.Variants)
            .HasForeignKey(x => x.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
