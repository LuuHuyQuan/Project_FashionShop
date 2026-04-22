using BuildingBlocks.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Ordering.Application.Contracts;
using Services.Ordering.Application.Features.Orders;

namespace Services.Ordering.Api.Controllers;

[ApiController]
[Route("api/orders")]
[Authorize]
public sealed class OrdersController(IDispatcher dispatcher) : ControllerBase
{
    [HttpGet("user/{userId:int}")]
    [ProducesResponseType(typeof(IReadOnlyList<OrderDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetByUser(int userId, CancellationToken cancellationToken)
        => Ok(await dispatcher.Query(new GetOrdersByUserQuery(userId), cancellationToken));

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(OrderDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
        => Ok(await dispatcher.Query(new GetOrderByIdQuery(id), cancellationToken));

    [HttpPost]
    [ProducesResponseType(typeof(OrderDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Create([FromBody] CreateOrderCommand command, CancellationToken cancellationToken)
        => Ok(await dispatcher.Send(command, cancellationToken));

    [HttpPatch("{id:int}/status")]
    [Authorize(Roles = "admin")]
    [ProducesResponseType(typeof(OrderDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateOrderStatusRequest request, CancellationToken cancellationToken)
        => Ok(await dispatcher.Send(new UpdateOrderStatusCommand(id, request.Status, request.PaymentStatus), cancellationToken));
}

public sealed record UpdateOrderStatusRequest(string Status, string PaymentStatus);
