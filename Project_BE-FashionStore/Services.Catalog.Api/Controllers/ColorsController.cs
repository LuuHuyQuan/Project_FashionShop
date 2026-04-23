using Microsoft.AspNetCore.Mvc;
using Services.Catalog.Api.DTOs;
using Services.Catalog.Application.Abstractions.Persistence;
using Services.Catalog.Domain.Entities;

namespace Services.Catalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ColorsController : ControllerBase
{
    private readonly IColorRepository _colorRepository;

    public ColorsController(IColorRepository colorRepository)
    {
        _colorRepository = colorRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var colors = await _colorRepository.GetAllAsync(cancellationToken);
        return Ok(colors);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var color = await _colorRepository.GetByIdAsync(id, cancellationToken);
        if (color == null)
            return NotFound();
        
        return Ok(color);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateColorRequest request, CancellationToken cancellationToken)
    {
        var color = new Color
        {
            Name = request.Name,
            HexCode = request.HexCode
        };

        var created = await _colorRepository.AddAsync(color, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateColorRequest request, CancellationToken cancellationToken)
    {
        var color = await _colorRepository.GetByIdAsync(id, cancellationToken);
        if (color == null)
            return NotFound();

        color.Name = request.Name;
        color.HexCode = request.HexCode;

        await _colorRepository.UpdateAsync(color, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var color = await _colorRepository.GetByIdAsync(id, cancellationToken);
        if (color == null)
            return NotFound();

        await _colorRepository.DeleteAsync(id, cancellationToken);
        return NoContent();
    }
}
