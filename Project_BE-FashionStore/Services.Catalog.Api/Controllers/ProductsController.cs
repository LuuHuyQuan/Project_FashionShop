using Microsoft.AspNetCore.Mvc;
using Services.Catalog.Application.Abstractions.Persistence;
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

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Product product)
    {
        await _productRepository.AddAsync(product);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Product product)
    {
        if (id != product.Id)
            return BadRequest();
        
        await _productRepository.UpdateAsync(product);
        return Ok(product);
    }
}
