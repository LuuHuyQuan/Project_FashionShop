using BuildingBlocks.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Ordering.Application.Contracts;
using Services.Ordering.Application.Features.Carts;

namespace Services.Ordering.Api.Controllers;

[ApiController]
[Route("api/carts")]
[Authorize]
public sealed class CartsController(IDispatcher dispatcher) : ControllerBase
{
    [HttpGet("user/{userId:int}")]
    [ProducesResponseType(typeof(CartDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetByUser(int userId, CancellationToken cancellationToken)
        => Ok(await dispatcher.Query(new GetCartByUserQuery(userId), cancellationToken));

    [HttpPost("items")]
    [ProducesResponseType(typeof(CartDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> AddItem([FromBody] AddCartItemCommand command, CancellationToken cancellationToken)
        => Ok(await dispatcher.Send(command, cancellationToken));

    [HttpPut("items/{id:int}")]
    [ProducesResponseType(typeof(CartItemDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateItem(int id, [FromBody] UpdateCartItemRequest request, CancellationToken cancellationToken)
        => Ok(await dispatcher.Send(new UpdateCartItemCommand(id, request.Quantity, request.UnitPriceSnapshot), cancellationToken));

    [HttpDelete("items/{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> RemoveItem(int id, CancellationToken cancellationToken)
    {
        await dispatcher.Send(new RemoveCartItemCommand(id), cancellationToken);
        return NoContent();
    }
}

public sealed record UpdateCartItemRequest(int Quantity, decimal UnitPriceSnapshot);
