using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Ordering.Application.Features.Carts.Commands.AddCartItem;
using Services.Ordering.Application.Features.Carts.Queries.GetMyCart;

namespace Services.Ordering.Api.Controllers;

[ApiController]
[Route("api/cart")]
[Authorize]
public sealed class CartsController : ControllerBase
{
    private readonly ISender _sender;

    public CartsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<IActionResult> GetMyCart(CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        var cart = await _sender.Send(new GetMyCartQuery(userId), cancellationToken);
        return Ok(cart);
    }

    [HttpPost("items")]
    public async Task<IActionResult> AddItem([FromBody] AddCartItemCommand command, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        var cart = await _sender.Send(command with { UserId = userId }, cancellationToken);
        return Ok(cart);
    }

    private int GetCurrentUserId()
    {
        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdValue, out var userId))
        {
            throw new UnauthorizedAccessException("Invalid authenticated user.");
        }

        return userId;
    }
}
