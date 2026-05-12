using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Catalog.Application.Features.Lookups.Commands.AddReview;
using Services.Catalog.Application.Features.Lookups.Queries.GetColors;
using Services.Catalog.Application.Features.Lookups.Queries.GetProductImages;
using Services.Catalog.Application.Features.Lookups.Queries.GetProductReviews;
using Services.Catalog.Application.Features.Lookups.Queries.GetProductVariants;
using Services.Catalog.Application.Features.Lookups.Queries.GetSizes;
using Services.Catalog.Application.Features.Products.Commands.UpsertProduct;
using Services.Catalog.Application.Features.Products.Common;
using Services.Catalog.Application.Features.Products.Queries.GetProductById;
using Services.Catalog.Application.Features.Products.Queries.GetProducts;
using Services.Catalog.Infrastructure.Persistence;

namespace Services.Catalog.Api.Controllers;

[ApiController]
[Route("api/catalog")]
public sealed class CatalogController : ControllerBase
{
    private readonly ISender _sender;
    private readonly CatalogDbContext _context;

    public CatalogController(ISender sender, CatalogDbContext context)
    {
        _sender = sender;
        _context = context;
    }

    [HttpGet("products")]
    [AllowAnonymous]
    public async Task<IActionResult> GetProducts(
        [FromQuery] bool includeInactive, 
        [FromQuery] string? search,
        [FromQuery] int? categoryId,
        [FromQuery] decimal? minPrice,
        [FromQuery] decimal? maxPrice,
        [FromQuery] string? sortBy,
        CancellationToken cancellationToken)
    {
        // Direct query to fix images issue
        var query = _context.Products
            .Include(p => p.Category)
            .Include(p => p.ProductImages)
            .Include(p => p.ProductVariants)
                .ThenInclude(pv => pv.Color)
            .Include(p => p.ProductVariants)
                .ThenInclude(pv => pv.Size)
            .AsSplitQuery()
            .AsQueryable();

        if (!includeInactive)
        {
            query = query.Where(p => p.Status == "active");
        }

        // Search by name or description
        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(p => 
                p.Name.Contains(search) || 
                (p.Description != null && p.Description.Contains(search)));
        }

        // Filter by category
        if (categoryId.HasValue)
        {
            query = query.Where(p => p.CategoryId == categoryId.Value);
        }

        // Filter by price range
        if (minPrice.HasValue)
        {
            query = query.Where(p => p.Price >= minPrice.Value);
        }

        if (maxPrice.HasValue)
        {
            query = query.Where(p => p.Price <= maxPrice.Value);
        }

        // Sort
        query = sortBy?.ToLower() switch
        {
            "price_asc" => query.OrderBy(p => p.Price),
            "price_desc" => query.OrderByDescending(p => p.Price),
            "name_asc" => query.OrderBy(p => p.Name),
            "name_desc" => query.OrderByDescending(p => p.Name),
            "newest" => query.OrderByDescending(p => p.CreatedAt),
            "popular" => query.OrderByDescending(p => p.SoldCount),
            _ => query.OrderByDescending(p => p.CreatedAt)
        };

        var products = await query.ToListAsync(cancellationToken);

        var result = products.Select(product => new ProductResponse(
            product.Id,
            product.CategoryId,
            product.Category?.Name ?? string.Empty,
            product.Name,
            product.Slug,
            product.Description,
            product.Price,
            product.OldPrice,
            product.Status,
            product.Badge,
            product.RatingAverage,
            product.ReviewCount,
            product.SoldCount,
            product.CreatedAt,
            product.UpdatedAt,
            product.ProductImages?.Select(img => new ProductImageResponse(
                img.Id,
                img.Url,
                img.IsThumbnail,
                img.SortOrder
            )).OrderBy(img => img.SortOrder).ToList() ?? new List<ProductImageResponse>(),
            product.ProductVariants?.Select(v => new ProductVariantResponse(
                v.Id,
                v.SKU,
                v.ColorId,
                v.Color?.Name ?? string.Empty,
                v.Color?.HexCode ?? string.Empty,
                v.SizeId,
                v.Size?.Name ?? string.Empty,
                v.StockQuantity,
                v.PriceOverride
            )).ToList() ?? new List<ProductVariantResponse>()))
        .ToList();

        return Ok(result);
    }

    [HttpGet("products/{id:int}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetProductById(int id, CancellationToken cancellationToken)
    {
        // Direct query to fix images issue
        var product = await _context.Products
            .Include(p => p.Category)
            .Include(p => p.ProductImages)
            .Include(p => p.ProductVariants)
                .ThenInclude(pv => pv.Color)
            .Include(p => p.ProductVariants)
                .ThenInclude(pv => pv.Size)
            .Include(p => p.Reviews)
            .AsSplitQuery()
            .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);

        if (product == null)
        {
            return NotFound(new { message = $"Product with ID {id} not found" });
        }

        var result = new ProductResponse(
            product.Id,
            product.CategoryId,
            product.Category?.Name ?? string.Empty,
            product.Name,
            product.Slug,
            product.Description,
            product.Price,
            product.OldPrice,
            product.Status,
            product.Badge,
            product.RatingAverage,
            product.ReviewCount,
            product.SoldCount,
            product.CreatedAt,
            product.UpdatedAt,
            product.ProductImages?.Select(img => new ProductImageResponse(
                img.Id,
                img.Url,
                img.IsThumbnail,
                img.SortOrder
            )).OrderBy(img => img.SortOrder).ToList() ?? new List<ProductImageResponse>(),
            product.ProductVariants?.Select(v => new ProductVariantResponse(
                v.Id,
                v.SKU,
                v.ColorId,
                v.Color?.Name ?? string.Empty,
                v.Color?.HexCode ?? string.Empty,
                v.SizeId,
                v.Size?.Name ?? string.Empty,
                v.StockQuantity,
                v.PriceOverride
            )).ToList() ?? new List<ProductVariantResponse>());

        return Ok(result);
    }

    [HttpGet("products/{id:int}/images")]
    [AllowAnonymous]
    public async Task<IActionResult> GetProductImages(int id, CancellationToken cancellationToken)
    {
        return Ok(await _sender.Send(new GetProductImagesQuery(id), cancellationToken));
    }

    [HttpGet("products/{id:int}/variants")]
    [AllowAnonymous]
    public async Task<IActionResult> GetProductVariants(int id, CancellationToken cancellationToken)
    {
        return Ok(await _sender.Send(new GetProductVariantsQuery(id), cancellationToken));
    }

    [HttpGet("products/{id:int}/reviews")]
    [AllowAnonymous]
    public async Task<IActionResult> GetProductReviews(int id, CancellationToken cancellationToken)
    {
        return Ok(await _sender.Send(new GetProductReviewsQuery(id), cancellationToken));
    }

    [HttpPost("products/{id:int}/reviews")]
    public async Task<IActionResult> AddReview(int id, [FromBody] AddReviewCommand command, CancellationToken cancellationToken)
    {
        // var userId = GetCurrentUserId();
        var userId = 1; // TODO: Get from JWT token
        return Ok(await _sender.Send(command with { UserId = userId, ProductId = id }, cancellationToken));
    }

    [HttpGet("colors")]
    [AllowAnonymous]
    public async Task<IActionResult> GetColors(CancellationToken cancellationToken)
    {
        return Ok(await _sender.Send(new GetColorsQuery(), cancellationToken));
    }

    [HttpGet("sizes")]
    [AllowAnonymous]
    public async Task<IActionResult> GetSizes(CancellationToken cancellationToken)
    {
        return Ok(await _sender.Send(new GetSizesQuery(), cancellationToken));
    }

    [HttpPost("products")]
    // [Authorize(Roles = "admin")] // TODO: Enable later
    public async Task<IActionResult> CreateProduct([FromBody] UpsertProductCommand command, CancellationToken cancellationToken)
    {
        var product = await _sender.Send(command with { Id = null }, cancellationToken);
        return Ok(product);
    }

    [HttpPut("products/{id:int}")]
    // [Authorize(Roles = "admin")] // TODO: Enable later
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] UpsertProductCommand command, CancellationToken cancellationToken)
    {
        var product = await _sender.Send(command with { Id = id }, cancellationToken);
        return Ok(product);
    }

    [HttpDelete("products/{id:int}")]
    // [Authorize(Roles = "admin")] // TODO: Enable later
    public async Task<IActionResult> DeleteProduct(int id, CancellationToken cancellationToken)
    {
        var product = await _context.Products.FindAsync(new object[] { id }, cancellationToken);
        if (product == null)
        {
            return NotFound(new { message = $"Product with ID {id} not found" });
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync(cancellationToken);

        return Ok(new { message = $"Product {product.Name} deleted successfully", id });
    }

    // Product Images Management
    [HttpPost("products/{productId:int}/images")]
    // [Authorize(Roles = "admin")]
    public async Task<IActionResult> AddProductImage(int productId, [FromBody] AddImageRequest request, CancellationToken cancellationToken)
    {
        var product = await _context.Products.FindAsync(new object[] { productId }, cancellationToken);
        if (product == null)
        {
            return NotFound(new { message = $"Product with ID {productId} not found" });
        }

        var image = new Domain.Entities.ProductImage
        {
            ProductId = productId,
            Url = request.Url,
            IsThumbnail = request.IsThumbnail,
            SortOrder = request.SortOrder
        };

        _context.ProductImages.Add(image);
        await _context.SaveChangesAsync(cancellationToken);

        return Ok(new { id = image.Id, productId = image.ProductId, url = image.Url, isThumbnail = image.IsThumbnail, sortOrder = image.SortOrder });
    }

    [HttpDelete("products/{productId:int}/images/{imageId:int}")]
    // [Authorize(Roles = "admin")]
    public async Task<IActionResult> DeleteProductImage(int productId, int imageId, CancellationToken cancellationToken)
    {
        var image = await _context.ProductImages.FirstOrDefaultAsync(i => i.Id == imageId && i.ProductId == productId, cancellationToken);
        if (image == null)
        {
            return NotFound(new { message = "Image not found" });
        }

        _context.ProductImages.Remove(image);
        await _context.SaveChangesAsync(cancellationToken);

        return Ok(new { message = "Image deleted successfully", id = imageId });
    }

    // Product Variants Management
    [HttpPost("products/{productId:int}/variants")]
    // [Authorize(Roles = "admin")]
    public async Task<IActionResult> AddProductVariant(int productId, [FromBody] AddVariantRequest request, CancellationToken cancellationToken)
    {
        var product = await _context.Products.FindAsync(new object[] { productId }, cancellationToken);
        if (product == null)
        {
            return NotFound(new { message = $"Product with ID {productId} not found" });
        }

        var variant = new Domain.Entities.ProductVariant
        {
            ProductId = productId,
            SKU = request.SKU,
            ColorId = request.ColorId,
            SizeId = request.SizeId,
            StockQuantity = request.StockQuantity,
            PriceOverride = request.PriceOverride
        };

        _context.ProductVariants.Add(variant);
        await _context.SaveChangesAsync(cancellationToken);

        // Load related data
        await _context.Entry(variant).Reference(v => v.Color).LoadAsync(cancellationToken);
        await _context.Entry(variant).Reference(v => v.Size).LoadAsync(cancellationToken);

        return Ok(new
        {
            id = variant.Id,
            productId = variant.ProductId,
            sku = variant.SKU,
            colorId = variant.ColorId,
            colorName = variant.Color?.Name,
            colorHexCode = variant.Color?.HexCode,
            sizeId = variant.SizeId,
            sizeName = variant.Size?.Name,
            stockQuantity = variant.StockQuantity,
            priceOverride = variant.PriceOverride
        });
    }

    [HttpPut("products/{productId:int}/variants/{variantId:int}")]
    // [Authorize(Roles = "admin")]
    public async Task<IActionResult> UpdateProductVariant(int productId, int variantId, [FromBody] UpdateVariantRequest request, CancellationToken cancellationToken)
    {
        var variant = await _context.ProductVariants
            .Include(v => v.Color)
            .Include(v => v.Size)
            .FirstOrDefaultAsync(v => v.Id == variantId && v.ProductId == productId, cancellationToken);

        if (variant == null)
        {
            return NotFound(new { message = "Variant not found" });
        }

        variant.SKU = request.SKU;
        variant.ColorId = request.ColorId;
        variant.SizeId = request.SizeId;
        variant.StockQuantity = request.StockQuantity;
        variant.PriceOverride = request.PriceOverride;

        await _context.SaveChangesAsync(cancellationToken);

        // Reload related data
        await _context.Entry(variant).Reference(v => v.Color).LoadAsync(cancellationToken);
        await _context.Entry(variant).Reference(v => v.Size).LoadAsync(cancellationToken);

        return Ok(new
        {
            id = variant.Id,
            productId = variant.ProductId,
            sku = variant.SKU,
            colorId = variant.ColorId,
            colorName = variant.Color?.Name,
            colorHexCode = variant.Color?.HexCode,
            sizeId = variant.SizeId,
            sizeName = variant.Size?.Name,
            stockQuantity = variant.StockQuantity,
            priceOverride = variant.PriceOverride
        });
    }

    [HttpDelete("products/{productId:int}/variants/{variantId:int}")]
    // [Authorize(Roles = "admin")]
    public async Task<IActionResult> DeleteProductVariant(int productId, int variantId, CancellationToken cancellationToken)
    {
        var variant = await _context.ProductVariants.FirstOrDefaultAsync(v => v.Id == variantId && v.ProductId == productId, cancellationToken);
        if (variant == null)
        {
            return NotFound(new { message = "Variant not found" });
        }

        _context.ProductVariants.Remove(variant);
        await _context.SaveChangesAsync(cancellationToken);

        return Ok(new { message = "Variant deleted successfully", id = variantId });
    }

    [HttpGet("management")]
    // [Authorize] // TODO: Enable later
    public IActionResult Management()
    {
        return Ok(new
        {
            message = "Catalog management endpoint (auth disabled for testing).",
            utc = DateTime.UtcNow
        });
    }

    private int GetCurrentUserId()
    {
        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdValue, out var userId))
        {
            throw new UnauthorizedAccessException("Invalid authenticated user.");
        }

        return userId;
    }
}

// Request DTOs
public record AddImageRequest(string Url, bool IsThumbnail, int SortOrder);
public record AddVariantRequest(string SKU, int ColorId, int SizeId, int StockQuantity, decimal? PriceOverride);
public record UpdateVariantRequest(string SKU, int ColorId, int SizeId, int StockQuantity, decimal? PriceOverride);
