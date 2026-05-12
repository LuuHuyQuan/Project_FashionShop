using MediatR;
using Microsoft.AspNetCore.Mvc;
using Services.Catalog.Api.DTOs;
using Services.Catalog.Application.Features.ProductVariants.Commands.CreateProductVariant;
using Services.Catalog.Application.Features.ProductVariants.Commands.DeleteProductVariant;
using Services.Catalog.Application.Features.ProductVariants.Commands.UpdateProductVariant;
using Services.Catalog.Application.Features.ProductVariants.Queries.GetProductVariantById;
using Services.Catalog.Application.Features.ProductVariants.Queries.GetProductVariants;

namespace Services.Catalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductVariantsController : ControllerBase
{
    private readonly ISender _sender;

    public ProductVariantsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var query = new GetProductVariantsQuery();
        var variants = await _sender.Send(query, cancellationToken);
        return Ok(variants);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var query = new GetProductVariantByIdQuery(id);
        var variant = await _sender.Send(query, cancellationToken);
        
        if (variant == null)
            return NotFound();
        
        return Ok(variant);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProductVariantRequest request, CancellationToken cancellationToken)
    {
        var command = new CreateProductVariantCommand(
            request.ProductId,
            request.ColorId,
            request.SizeId,
            request.SKU,
            request.StockQuantity,
            request.PriceOverride
        );

        var created = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateProductVariantRequest request, CancellationToken cancellationToken)
    {
        var command = new UpdateProductVariantCommand(
            id,
            request.ProductId,
            request.ColorId,
            request.SizeId,
            request.SKU,
            request.StockQuantity,
            request.PriceOverride
        );

        var success = await _sender.Send(command, cancellationToken);
        
        if (!success)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var command = new DeleteProductVariantCommand(id);
        var success = await _sender.Send(command, cancellationToken);
        
        if (!success)
            return NotFound();

        return NoContent();
    }

    /// <summary>
    /// Check stock availability by variant ID
    /// </summary>
    [HttpGet("{id}/stock")]
    public async Task<IActionResult> CheckStockByVariantId(int id, CancellationToken cancellationToken)
    {
        var query = new GetProductVariantByIdQuery(id);
        var variant = await _sender.Send(query, cancellationToken);
        
        if (variant == null)
        {
            return NotFound(new StockCheckResponse
            {
                Available = false,
                StockQuantity = 0,
                Message = "Không tìm thấy sản phẩm"
            });
        }

        return Ok(new StockCheckResponse
        {
            Available = variant.StockQuantity > 0,
            StockQuantity = variant.StockQuantity,
            VariantId = variant.Id,
            Message = variant.StockQuantity > 0 ? "Còn hàng" : "Hết hàng"
        });
    }

    /// <summary>
    /// Check stock availability by product, color, and size
    /// </summary>
    [HttpGet("check-stock")]
    public async Task<IActionResult> CheckStock(
        [FromQuery] int productId, 
        [FromQuery] int colorId, 
        [FromQuery] int sizeId, 
        CancellationToken cancellationToken)
    {
        var query = new GetProductVariantsQuery();
        var variants = await _sender.Send(query, cancellationToken);
        
        var variant = variants.FirstOrDefault(v => 
            v.ProductId == productId && 
            v.ColorId == colorId && 
            v.SizeId == sizeId
        );
        
        if (variant == null)
        {
            return NotFound(new StockCheckResponse
            {
                Available = false,
                StockQuantity = 0,
                Message = "Không tìm thấy biến thể sản phẩm"
            });
        }

        return Ok(new StockCheckResponse
        {
            Available = variant.StockQuantity > 0,
            StockQuantity = variant.StockQuantity,
            VariantId = variant.Id,
            Message = variant.StockQuantity > 0 ? "Còn hàng" : "Hết hàng"
        });
    }
}
