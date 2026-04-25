using MediatR;
using Microsoft.AspNetCore.Mvc;
using Services.Catalog.Api.DTOs;
using Services.Catalog.Application.Features.Categories.Commands.CreateCategory;
using Services.Catalog.Application.Features.Categories.Commands.DeleteCategory;
using Services.Catalog.Application.Features.Categories.Commands.UpdateCategory;
using Services.Catalog.Application.Features.Categories.Queries.GetCategories;
using Services.Catalog.Application.Features.Categories.Queries.GetCategoryById;

namespace Services.Catalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ISender _sender;

    public CategoriesController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var query = new GetCategoriesQuery();
        var categories = await _sender.Send(query, cancellationToken);
        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var query = new GetCategoryByIdQuery(id);
        var category = await _sender.Send(query, cancellationToken);
        
        if (category == null)
            return NotFound();
        
        return Ok(category);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCategoryRequest request, CancellationToken cancellationToken)
    {
        var command = new CreateCategoryCommand(
            request.Name,
            request.Slug,
            request.Description,
            request.Image,
            request.Status
        );

        var created = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateCategoryRequest request, CancellationToken cancellationToken)
    {
        var command = new UpdateCategoryCommand(
            id,
            request.Name,
            request.Slug,
            request.Description,
            request.Image,
            request.Status
        );

        var success = await _sender.Send(command, cancellationToken);
        
        if (!success)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var command = new DeleteCategoryCommand(id);
        var success = await _sender.Send(command, cancellationToken);
        
        if (!success)
            return NotFound();

        return NoContent();
    }
}
