using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Infrastructure.Persistence.Configurations;

public sealed class ProductImageConfiguration : IEntityTypeConfiguration<ProductImage>
{
    public void Configure(EntityTypeBuilder<ProductImage> builder)
    {
        builder.ToTable("ProductImages", "dbo");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();

        builder.Property(x => x.Url)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(x => x.IsThumbnail)
            .IsRequired();

        builder.Property(x => x.SortOrder)
            .IsRequired();
    }
}
