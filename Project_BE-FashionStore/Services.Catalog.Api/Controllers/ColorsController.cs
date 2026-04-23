using MediatR;
using Microsoft.AspNetCore.Mvc;
using Services.Catalog.Api.DTOs;
using Services.Catalog.Application.Features.Colors.Commands.CreateColor;
using Services.Catalog.Application.Features.Colors.Commands.DeleteColor;
using Services.Catalog.Application.Features.Colors.Commands.UpdateColor;
using Services.Catalog.Application.Features.Colors.Queries.GetColorById;
using Services.Catalog.Application.Features.Colors.Queries.GetColors;

namespace Services.Catalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ColorsController : ControllerBase
{
    private readonly ISender _sender;

    public ColorsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var query = new GetColorsQuery();
        var colors = await _sender.Send(query, cancellationToken);
        return Ok(colors);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var query = new GetColorByIdQuery(id);
        var color = await _sender.Send(query, cancellationToken);
        
        if (color == null)
            return NotFound();
        
        return Ok(color);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateColorRequest request, CancellationToken cancellationToken)
    {
        var command = new CreateColorCommand(request.Name, request.HexCode);
        var created = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateColorRequest request, CancellationToken cancellationToken)
    {
        var command = new UpdateColorCommand(id, request.Name, request.HexCode);
        var success = await _sender.Send(command, cancellationToken);
        
        if (!success)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var command = new DeleteColorCommand(id);
        var success = await _sender.Send(command, cancellationToken);
        
        if (!success)
            return NotFound();

        return NoContent();
    }
}
