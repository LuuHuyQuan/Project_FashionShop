using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Infrastructure.Persistence.Configurations;

public sealed class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products", "dbo");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id).ValueGeneratedOnAdd();

        builder.Property(x => x.CategoryId)
            .IsRequired();

        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.Slug)
            .HasMaxLength(220)
            .IsRequired();

        builder.Property(x => x.Description);

        builder.Property(x => x.Price)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(x => x.OldPrice)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.Status)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.Badge)
            .HasMaxLength(50);

        builder.Property(x => x.RatingAverage)
            .HasColumnType("decimal(3,2)")
            .IsRequired();

        builder.Property(x => x.ReviewCount)
            .IsRequired();

        builder.Property(x => x.SoldCount)
            .IsRequired();

        builder.Ignore(x => x.IsActive);

        builder.Property(x => x.CreatedAt)
            .HasColumnName("CreatedAt")
            .IsRequired();

        builder.Property(x => x.UpdatedAt)
            .HasColumnName("UpdatedAt");

        builder.HasIndex(x => x.Slug)
            .IsUnique();
    }
}
