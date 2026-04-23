using Microsoft.AspNetCore.Mvc;
using Services.Catalog.Api.DTOs;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductImagesController : ControllerBase
{
    private readonly IProductImageRepository _imageRepository;

    public ProductImagesController(IProductImageRepository imageRepository)
    {
        _imageRepository = imageRepository;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var image = await _imageRepository.GetByIdAsync(id);
        if (image == null)
            return NotFound();
        
        return Ok(image);
    }

    [HttpGet("product/{productId}")]
    public async Task<IActionResult> GetByProductId(int productId)
    {
        var images = await _imageRepository.GetByProductIdAsync(productId);
        return Ok(images);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProductImageRequest request)
    {
        var image = new ProductImage
        {
            ProductId = request.ProductId,
            Url = request.Url,
            IsThumbnail = request.IsThumbnail,
            SortOrder = request.SortOrder
        };
        
        var created = await _imageRepository.CreateAsync(image);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateProductImageRequest request)
    {
        var image = await _imageRepository.GetByIdAsync(id);
        if (image == null)
            return NotFound();
        
        image.ProductId = request.ProductId;
        image.Url = request.Url;
        image.IsThumbnail = request.IsThumbnail;
        image.SortOrder = request.SortOrder;
        
        var updated = await _imageRepository.UpdateAsync(image);
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _imageRepository.DeleteAsync(id);
        return NoContent();
    }
}
