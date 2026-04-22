using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Infrastructure.Persistence.Configurations;

public sealed class WishlistItemConfiguration : IEntityTypeConfiguration<WishlistItem>
{
    public void Configure(EntityTypeBuilder<WishlistItem> builder)
    {
        builder.ToTable("WishlistItems", "dbo");
        builder.HasKey(x => x.Id);
        builder.HasIndex(x => new { x.UserId, x.ProductId }).IsUnique();
    }
}
