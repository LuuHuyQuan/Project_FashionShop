using MediatR;
using Microsoft.AspNetCore.Mvc;
using Services.Catalog.Api.DTOs;
using Services.Catalog.Application.Features.Sizes.Commands.CreateSize;
using Services.Catalog.Application.Features.Sizes.Commands.DeleteSize;
using Services.Catalog.Application.Features.Sizes.Commands.UpdateSize;
using Services.Catalog.Application.Features.Sizes.Queries.GetSizeById;
using Services.Catalog.Application.Features.Sizes.Queries.GetSizes;

namespace Services.Catalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SizesController : ControllerBase
{
    private readonly ISender _sender;

    public SizesController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var query = new GetSizesQuery();
        var sizes = await _sender.Send(query, cancellationToken);
        return Ok(sizes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var query = new GetSizeByIdQuery(id);
        var size = await _sender.Send(query, cancellationToken);
        
        if (size == null)
            return NotFound();
        
        return Ok(size);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSizeRequest request, CancellationToken cancellationToken)
    {
        var command = new CreateSizeCommand(request.Name);
        var created = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateSizeRequest request, CancellationToken cancellationToken)
    {
        var command = new UpdateSizeCommand(id, request.Name);
        var success = await _sender.Send(command, cancellationToken);
        
        if (!success)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var command = new DeleteSizeCommand(id);
        var success = await _sender.Send(command, cancellationToken);
        
        if (!success)
            return NotFound();

        return NoContent();
    }
}
