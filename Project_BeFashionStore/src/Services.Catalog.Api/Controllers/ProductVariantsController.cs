using BuildingBlocks.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Catalog.Application.Contracts;
using Services.Catalog.Application.Features.Variants;

namespace Services.Catalog.Api.Controllers;

[ApiController]
[Route("api/product-variants")]
public sealed class ProductVariantsController(IDispatcher dispatcher) : ControllerBase
{
    [HttpGet("product/{productId:int}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IReadOnlyList<ProductVariantDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetByProduct(int productId, CancellationToken cancellationToken)
        => Ok(await dispatcher.Query(new GetProductVariantsQuery(productId), cancellationToken));

    [HttpPost]
    [Authorize(Roles = "admin")]
    [ProducesResponseType(typeof(ProductVariantDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Create([FromBody] CreateProductVariantCommand command, CancellationToken cancellationToken)
        => Ok(await dispatcher.Send(command, cancellationToken));

    [HttpPut("{id:int}")]
    [Authorize(Roles = "admin")]
    [ProducesResponseType(typeof(ProductVariantDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateProductVariantRequest request, CancellationToken cancellationToken)
        => Ok(await dispatcher.Send(new UpdateProductVariantCommand(id, request.ProductId, request.ColorId, request.SizeId, request.Sku, request.StockQuantity, request.PriceOverride), cancellationToken));

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        await dispatcher.Send(new DeleteProductVariantCommand(id), cancellationToken);
        return NoContent();
    }
}

public sealed record UpdateProductVariantRequest(int ProductId, int ColorId, int SizeId, string Sku, int StockQuantity, decimal? PriceOverride);
