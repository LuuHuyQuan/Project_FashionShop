using BuildingBlocks.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Catalog.Application.Contracts;
using Services.Catalog.Application.Features.Products;

namespace Services.Catalog.Api.Controllers;

[ApiController]
[Route("api/products")]
public sealed class ProductsController(IDispatcher dispatcher) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IReadOnlyList<ProductDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        => Ok(await dispatcher.Query(new GetProductsQuery(), cancellationToken));

    [HttpGet("{id:int}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
        => Ok(await dispatcher.Query(new GetProductByIdQuery(id), cancellationToken));

    [HttpPost]
    [Authorize(Roles = "admin")]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Create([FromBody] CreateProductCommand command, CancellationToken cancellationToken)
        => Ok(await dispatcher.Send(command, cancellationToken));

    [HttpPut("{id:int}")]
    [Authorize(Roles = "admin")]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateProductRequest request, CancellationToken cancellationToken)
        => Ok(await dispatcher.Send(new UpdateProductCommand(id, request.CategoryId, request.Name, request.Slug, request.Description, request.Price, request.OldPrice, request.Status, request.Badge), cancellationToken));

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        await dispatcher.Send(new DeleteProductCommand(id), cancellationToken);
        return NoContent();
    }
}

public sealed record UpdateProductRequest(int CategoryId, string Name, string Slug, string? Description, decimal Price, decimal? OldPrice, string Status, string? Badge);
