using Microsoft.EntityFrameworkCore;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Domain.Entities;
using Services.Catalog.Infrastructure.Persistence;

namespace Services.Catalog.Infrastructure.Repositories;

public class ReviewRepository : IReviewRepository
{
    private readonly CatalogDbContext _context;

    public ReviewRepository(CatalogDbContext context)
    {
        _context = context;
    }

    public async Task<Review?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Reviews
            .Include(r => r.Product)
            .FirstOrDefaultAsync(r => r.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyCollection<Review>> GetByProductIdAsync(int productId, CancellationToken cancellationToken = default)
    {
        return await _context.Reviews
            .Where(r => r.ProductId == productId)
            .OrderByDescending(r => r.CreatedAt)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<Review?> GetByUserAndProductAsync(int userId, int productId, CancellationToken cancellationToken = default)
    {
        return await _context.Reviews
            .FirstOrDefaultAsync(r => r.UserId == userId && r.ProductId == productId, cancellationToken);
    }

    public async Task AddAsync(Review review, CancellationToken cancellationToken = default)
    {
        await _context.Reviews.AddAsync(review, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        
        // Update product rating statistics
        await UpdateProductRatingAsync(review.ProductId, cancellationToken);
    }

    public async Task UpdateAsync(Review review, CancellationToken cancellationToken = default)
    {
        _context.Reviews.Update(review);
        await _context.SaveChangesAsync(cancellationToken);
        
        // Update product rating statistics
        await UpdateProductRatingAsync(review.ProductId, cancellationToken);
    }

    public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var review = await _context.Reviews.FindAsync(new object[] { id }, cancellationToken);
        if (review != null)
        {
            var productId = review.ProductId;
            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync(cancellationToken);
            
            // Update product rating statistics
            await UpdateProductRatingAsync(productId, cancellationToken);
        }
    }

    private async Task UpdateProductRatingAsync(int productId, CancellationToken cancellationToken)
    {
        var product = await _context.Products.FindAsync(new object[] { productId }, cancellationToken);
        if (product != null)
        {
            var reviews = await _context.Reviews
                .Where(r => r.ProductId == productId)
                .ToListAsync(cancellationToken);
            
            product.ReviewCount = reviews.Count;
            product.RatingAverage = reviews.Any() 
                ? (decimal)reviews.Average(r => r.Rating) 
                : 0;
            
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
