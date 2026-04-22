using BuildingBlocks.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Catalog.Application.Contracts;
using Services.Catalog.Application.Features.Categories;

namespace Services.Catalog.Api.Controllers;

[ApiController]
[Route("api/categories")]
public sealed class CategoriesController(IDispatcher dispatcher) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IReadOnlyList<CategoryDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        => Ok(await dispatcher.Query(new GetCategoriesQuery(), cancellationToken));

    [HttpGet("{id:int}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(CategoryDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
        => Ok(await dispatcher.Query(new GetCategoryByIdQuery(id), cancellationToken));

    [HttpPost]
    [Authorize(Roles = "admin")]
    [ProducesResponseType(typeof(CategoryDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Create([FromBody] CreateCategoryCommand command, CancellationToken cancellationToken)
        => Ok(await dispatcher.Send(command, cancellationToken));

    [HttpPut("{id:int}")]
    [Authorize(Roles = "admin")]
    [ProducesResponseType(typeof(CategoryDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateCategoryRequest request, CancellationToken cancellationToken)
        => Ok(await dispatcher.Send(new UpdateCategoryCommand(id, request.Name, request.Slug, request.Description, request.Status), cancellationToken));

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        await dispatcher.Send(new DeleteCategoryCommand(id), cancellationToken);
        return NoContent();
    }
}

public sealed record UpdateCategoryRequest(string Name, string Slug, string? Description, string Status);
