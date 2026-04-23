using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Catalog.Application.Features.Lookups.Commands.AddReview;
using Services.Catalog.Application.Features.Lookups.Queries.GetColors;
using Services.Catalog.Application.Features.Lookups.Queries.GetProductImages;
using Services.Catalog.Application.Features.Lookups.Queries.GetProductReviews;
using Services.Catalog.Application.Features.Lookups.Queries.GetProductVariants;
using Services.Catalog.Application.Features.Lookups.Queries.GetSizes;
using Services.Catalog.Application.Features.Products.Commands.UpsertProduct;
using Services.Catalog.Application.Features.Products.Queries.GetProductById;
using Services.Catalog.Application.Features.Products.Queries.GetProducts;

namespace Services.Catalog.Api.Controllers;

[ApiController]
[Route("api/catalog")]
public sealed class CatalogController : ControllerBase
{
    private readonly ISender _sender;

    public CatalogController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet("products")]
    [AllowAnonymous]
    public async Task<IActionResult> GetProducts([FromQuery] bool includeInactive, CancellationToken cancellationToken)
    {
        var products = await _sender.Send(new GetProductsQuery(includeInactive), cancellationToken);
        return Ok(products);
    }

    [HttpGet("products/{id:int}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetProductById(int id, CancellationToken cancellationToken)
    {
        var product = await _sender.Send(new GetProductByIdQuery(id), cancellationToken);
        return Ok(product);
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
    // [Authorize] // TODO: Enable later
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
