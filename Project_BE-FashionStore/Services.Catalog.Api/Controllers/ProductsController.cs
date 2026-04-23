using Microsoft.AspNetCore.Mvc;
using Services.Catalog.Infrastructure.Repositories;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _productRepository;

    public ProductsController(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _productRepository.GetAllAsync();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _productRepository.GetByIdAsync(id);
        if (product == null)
            return NotFound();
        
        return Ok(product);
    }

    [HttpGet("slug/{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var product = await _productRepository.GetBySlugAsync(slug);
        if (product == null)
            return NotFound();
        
        return Ok(product);
    }

    [HttpGet("category/{categoryId}")]
    public async Task<IActionResult> GetByCategory(int categoryId)
    {
        var products = await _productRepository.GetByCategoryAsync(categoryId);
        return Ok(products);
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string keyword)
    {
        var products = await _productRepository.SearchAsync(keyword);
        return Ok(products);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Product product)
    {
        var created = await _productRepository.CreateAsync(product);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Product product)
    {
        if (id != product.Id)
            return BadRequest();
        
        var updated = await _productRepository.UpdateAsync(product);
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _productRepository.DeleteAsync(id);
        return NoContent();
    }
}
