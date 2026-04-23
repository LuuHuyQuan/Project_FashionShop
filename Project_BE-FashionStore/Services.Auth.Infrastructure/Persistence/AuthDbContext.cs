using Microsoft.EntityFrameworkCore;
using Services.Auth.Domain.Entities;

namespace Services.Auth.Infrastructure.Persistence;

public class AuthDbContext : DbContext
{
    public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options) { }
    
    public DbSet<User> Users { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<Address> Addresses { get; set; }
    public DbSet<WishlistItem> WishlistItems { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("Users");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FullName).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Email).HasMaxLength(255).IsRequired();
            entity.Property(e => e.Phone).HasMaxLength(20).IsRequired();
            entity.Property(e => e.PasswordHash).HasMaxLength(255).IsRequired();
            entity.Property(e => e.Role).HasMaxLength(20).IsRequired().HasDefaultValue("customer");
            entity.Property(e => e.Status).HasMaxLength(20).IsRequired().HasDefaultValue("active");
            entity.Property(e => e.CreatedAt).IsRequired().HasDefaultValueSql("SYSUTCDATETIME()");
            entity.HasIndex(e => e.Email).IsUnique();
        });
        
        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.ToTable("RefreshTokens");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Token).HasMaxLength(500).IsRequired();
            entity.Property(e => e.CreatedAt).IsRequired().HasDefaultValueSql("SYSUTCDATETIME()");
            entity.HasIndex(e => e.Token).IsUnique();
            entity.HasOne(e => e.User)
                .WithMany(u => u.RefreshTokens)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        modelBuilder.Entity<Address>(entity =>
        {
            entity.ToTable("Addresses");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.RecipientName).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Phone).HasMaxLength(20).IsRequired();
            entity.Property(e => e.AddressLine).HasMaxLength(500).IsRequired();
            entity.Property(e => e.City).HasMaxLength(100);
            entity.Property(e => e.District).HasMaxLength(100);
            entity.Property(e => e.Ward).HasMaxLength(100);
            entity.Property(e => e.IsDefault).IsRequired().HasDefaultValue(false);
            entity.HasOne(e => e.User)
                .WithMany(u => u.Addresses)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasIndex(e => e.UserId);
        });
        
        modelBuilder.Entity<WishlistItem>(entity =>
        {
            entity.ToTable("WishlistItems");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.CreatedAt).IsRequired().HasDefaultValueSql("SYSUTCDATETIME()");
            entity.HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasIndex(e => new { e.UserId, e.ProductId }).IsUnique();
        });
    }
}
