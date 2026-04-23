using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Application.Abstractions.Persistence;

public interface ICatalogLookupRepository
{
    Task<IReadOnlyCollection<ProductImage>> GetProductImagesAsync(int productId, CancellationToken cancellationToken = default);
    Task<IReadOnlyCollection<ProductVariant>> GetProductVariantsAsync(int productId, CancellationToken cancellationToken = default);
    Task<IReadOnlyCollection<Color>> GetColorsAsync(CancellationToken cancellationToken = default);
    Task<IReadOnlyCollection<Size>> GetSizesAsync(CancellationToken cancellationToken = default);
    Task<IReadOnlyCollection<Review>> GetProductReviewsAsync(int productId, CancellationToken cancellationToken = default);
    Task AddReviewAsync(Review review, CancellationToken cancellationToken = default);
    Task SaveChangesAsync(CancellationToken cancellationToken = default);
}
