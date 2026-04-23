using Microsoft.AspNetCore.Mvc;
using Services.Catalog.Api.DTOs;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SizesController : ControllerBase
{
    private readonly ISizeRepository _sizeRepository;

    public SizesController(ISizeRepository sizeRepository)
    {
        _sizeRepository = sizeRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var sizes = await _sizeRepository.GetAllAsync(cancellationToken);
        return Ok(sizes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var size = await _sizeRepository.GetByIdAsync(id, cancellationToken);
        if (size == null)
            return NotFound();
        
        return Ok(size);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSizeRequest request, CancellationToken cancellationToken)
    {
        var size = new Size
        {
            Name = request.Name
        };

        var created = await _sizeRepository.AddAsync(size, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateSizeRequest request, CancellationToken cancellationToken)
    {
        var size = await _sizeRepository.GetByIdAsync(id, cancellationToken);
        if (size == null)
            return NotFound();

        size.Name = request.Name;

        await _sizeRepository.UpdateAsync(size, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var size = await _sizeRepository.GetByIdAsync(id, cancellationToken);
        if (size == null)
            return NotFound();

        await _sizeRepository.DeleteAsync(id, cancellationToken);
        return NoContent();
    }
}
