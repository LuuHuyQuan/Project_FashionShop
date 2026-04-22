using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Infrastructure.Persistence.Configurations;

public sealed class CartConfiguration : IEntityTypeConfiguration<Cart>
{
    public void Configure(EntityTypeBuilder<Cart> builder)
    {
        builder.ToTable("Carts", "dbo");
        builder.HasKey(x => x.Id);
        builder.HasIndex(x => x.UserId).IsUnique();
    }
}
