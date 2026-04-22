using BuildingBlocks.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Ordering.Application.Contracts;
using Services.Ordering.Application.Features.WishlistItems;

namespace Services.Ordering.Api.Controllers;

[ApiController]
[Route("api/wishlist")]
[Authorize]
public sealed class WishlistController(IDispatcher dispatcher) : ControllerBase
{
    [HttpGet("user/{userId:int}")]
    [ProducesResponseType(typeof(IReadOnlyList<WishlistItemDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetByUser(int userId, CancellationToken cancellationToken)
        => Ok(await dispatcher.Query(new GetWishlistByUserQuery(userId), cancellationToken));

    [HttpPost]
    [ProducesResponseType(typeof(WishlistItemDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Create([FromBody] CreateWishlistItemCommand command, CancellationToken cancellationToken)
        => Ok(await dispatcher.Send(command, cancellationToken));

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        await dispatcher.Send(new DeleteWishlistItemCommand(id), cancellationToken);
        return NoContent();
    }
}
