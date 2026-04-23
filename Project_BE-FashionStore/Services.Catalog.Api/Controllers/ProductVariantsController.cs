using Microsoft.AspNetCore.Mvc;
using Services.Catalog.Api.DTOs;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductVariantsController : ControllerBase
{
    private readonly IProductVariantRepository _variantRepository;

    public ProductVariantsController(IProductVariantRepository variantRepository)
    {
        _variantRepository = variantRepository;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var variant = await _variantRepository.GetByIdAsync(id);
        if (variant == null)
            return NotFound();
        
        return Ok(variant);
    }

    [HttpGet("sku/{sku}")]
    public async Task<IActionResult> GetBySKU(string sku)
    {
        var variant = await _variantRepository.GetBySKUAsync(sku);
        if (variant == null)
            return NotFound();
        
        return Ok(variant);
    }

    [HttpGet("product/{productId}")]
    public async Task<IActionResult> GetByProductId(int productId)
    {
        var variants = await _variantRepository.GetByProductIdAsync(productId);
        return Ok(variants);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProductVariantRequest request)
    {
        var variant = new ProductVariant
        {
            ProductId = request.ProductId,
            ColorId = request.ColorId,
            SizeId = request.SizeId,
            SKU = request.SKU,
            StockQuantity = request.StockQuantity,
            PriceOverride = request.PriceOverride
        };
        
        var created = await _variantRepository.CreateAsync(variant);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateProductVariantRequest request)
    {
        var variant = await _variantRepository.GetByIdAsync(id);
        if (variant == null)
            return NotFound();
        
        variant.ProductId = request.ProductId;
        variant.ColorId = request.ColorId;
        variant.SizeId = request.SizeId;
        variant.SKU = request.SKU;
        variant.StockQuantity = request.StockQuantity;
        variant.PriceOverride = request.PriceOverride;
        
        var updated = await _variantRepository.UpdateAsync(variant);
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _variantRepository.DeleteAsync(id);
        return NoContent();
    }
}
