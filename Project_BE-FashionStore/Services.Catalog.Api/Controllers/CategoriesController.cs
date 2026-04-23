using Microsoft.AspNetCore.Mvc;
using Services.Catalog.Infrastructure.Repositories;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoriesController(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await _categoryRepository.GetAllAsync();
        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null)
            return NotFound();
        
        return Ok(category);
    }

    [HttpGet("slug/{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var category = await _categoryRepository.GetBySlugAsync(slug);
        if (category == null)
            return NotFound();
        
        return Ok(category);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Category category)
    {
        var created = await _categoryRepository.CreateAsync(category);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Category category)
    {
        if (id != category.Id)
            return BadRequest();
        
        var updated = await _categoryRepository.UpdateAsync(category);
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _categoryRepository.DeleteAsync(id);
        return NoContent();
    }
}
