using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Services.Auth.Domain.Entities;

namespace Services.Auth.Infrastructure.Persistence.Configurations;

public sealed class AddressConfiguration : IEntityTypeConfiguration<Address>
{
    public void Configure(EntityTypeBuilder<Address> builder)
    {
        builder.ToTable("Addresses", "dbo");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id).ValueGeneratedOnAdd();

        builder.Property(x => x.RecipientName)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.Phone)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.AddressLine)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(x => x.City)
            .HasMaxLength(100);

        builder.Property(x => x.District)
            .HasMaxLength(100);

        builder.Property(x => x.Ward)
            .HasMaxLength(100);

        builder.Property(x => x.IsDefault)
            .IsRequired();

        builder.HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
