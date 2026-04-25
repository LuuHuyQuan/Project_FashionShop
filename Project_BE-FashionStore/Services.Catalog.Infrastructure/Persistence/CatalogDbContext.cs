using Microsoft.EntityFrameworkCore;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Infrastructure.Persistence;

public class CatalogDbContext : DbContext
{
    public CatalogDbContext(DbContextOptions<CatalogDbContext> options) : base(options) { }
    
    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductImage> ProductImages { get; set; }
    public DbSet<Color> Colors { get; set; }
    public DbSet<Size> Sizes { get; set; }
    public DbSet<ProductVariant> ProductVariants { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<WishlistItem> WishlistItems { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("Categories");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(150).IsRequired();
            entity.Property(e => e.Slug).HasMaxLength(180).IsRequired();
            entity.Property(e => e.Image).HasColumnType("NVARCHAR(MAX)");
            entity.Property(e => e.Status).HasMaxLength(20).IsRequired().HasDefaultValue("active");
            entity.HasIndex(e => e.Slug).IsUnique();
        });
        
        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("Products");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Slug).HasMaxLength(220).IsRequired();
            entity.Property(e => e.Price).HasColumnType("decimal(18,2)").IsRequired();
            entity.Property(e => e.OldPrice).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Status).HasMaxLength(20).IsRequired().HasDefaultValue("active");
            entity.Property(e => e.Badge).HasMaxLength(50);
            entity.Property(e => e.RatingAverage).HasColumnType("decimal(3,2)").IsRequired().HasDefaultValue(0);
            entity.Property(e => e.ReviewCount).IsRequired().HasDefaultValue(0);
            entity.Property(e => e.SoldCount).IsRequired().HasDefaultValue(0);
            entity.Property(e => e.CreatedAt).IsRequired().HasDefaultValueSql("SYSUTCDATETIME()");
            entity.HasIndex(e => e.Slug).IsUnique();
            entity.HasIndex(e => e.CategoryId);
            entity.HasOne(e => e.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(e => e.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        
        modelBuilder.Entity<ProductImage>(entity =>
        {
            entity.ToTable("ProductImages");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Url).HasMaxLength(500).IsRequired();
            entity.Property(e => e.IsThumbnail).IsRequired().HasDefaultValue(false);
            entity.Property(e => e.SortOrder).IsRequired().HasDefaultValue(0);
            entity.HasIndex(e => e.ProductId);
            entity.HasOne(e => e.Product)
                .WithMany(p => p.ProductImages)
                .HasForeignKey(e => e.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        
        modelBuilder.Entity<Color>(entity =>
        {
            entity.ToTable("Colors");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(50).IsRequired();
            entity.Property(e => e.HexCode).HasMaxLength(20).IsRequired();
        });
        
        modelBuilder.Entity<Size>(entity =>
        {
            entity.ToTable("Sizes");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(20).IsRequired();
        });
        
        modelBuilder.Entity<ProductVariant>(entity =>
        {
            entity.ToTable("ProductVariants");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.SKU).HasMaxLength(80).IsRequired();
            entity.Property(e => e.StockQuantity).IsRequired().HasDefaultValue(0);
            entity.Property(e => e.PriceOverride).HasColumnType("decimal(18,2)");
            entity.HasIndex(e => e.SKU).IsUnique();
            entity.HasIndex(e => e.ProductId);
            entity.HasIndex(e => e.ColorId);
            entity.HasIndex(e => e.SizeId);
            entity.HasOne(e => e.Product)
                .WithMany(p => p.ProductVariants)
                .HasForeignKey(e => e.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Color)
                .WithMany(c => c.ProductVariants)
                .HasForeignKey(e => e.ColorId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.Size)
                .WithMany(s => s.ProductVariants)
                .HasForeignKey(e => e.SizeId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        
        modelBuilder.Entity<Review>(entity =>
        {
            entity.ToTable("Reviews");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Rating).IsRequired();
            entity.Property(e => e.Comment).HasMaxLength(2000);
            entity.Property(e => e.CreatedAt).IsRequired().HasDefaultValueSql("SYSUTCDATETIME()");
            entity.HasIndex(e => e.ProductId);
            entity.HasIndex(e => new { e.UserId, e.ProductId }).IsUnique();
            entity.HasOne(e => e.Product)
                .WithMany(p => p.Reviews)
                .HasForeignKey(e => e.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasCheckConstraint("CK_Reviews_Rating", "[Rating] BETWEEN 1 AND 5");
        });
        
        modelBuilder.Entity<WishlistItem>(entity =>
        {
            entity.ToTable("WishlistItems");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.CreatedAt).IsRequired().HasDefaultValueSql("SYSUTCDATETIME()");
            entity.HasIndex(e => e.ProductId);
            entity.HasIndex(e => new { e.UserId, e.ProductId }).IsUnique();
            entity.HasOne(e => e.Product)
                .WithMany(p => p.WishlistItems)
                .HasForeignKey(e => e.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
