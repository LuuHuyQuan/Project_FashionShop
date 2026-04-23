using MediatR;
using Microsoft.AspNetCore.Mvc;
using Services.Ordering.Application.Features.Orders.Commands.Checkout;
using Services.Ordering.Application.Features.Orders.Commands.DeleteOrder;
using Services.Ordering.Application.Features.Orders.Commands.UpdateOrderStatus;
using Services.Ordering.Application.Features.Orders.Queries.GetMyOrders;
using Services.Ordering.Application.Features.Orders.Queries.GetOrderByCode;
using Services.Ordering.Application.Features.Orders.Queries.GetOrderById;
using Services.Ordering.Application.Features.Orders.Queries.GetOrders;

namespace Services.Ordering.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly ISender _sender;

    public OrdersController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var query = new GetOrdersQuery();
        var orders = await _sender.Send(query, cancellationToken);
        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var query = new GetOrderByIdQuery(id);
        var order = await _sender.Send(query, cancellationToken);
        
        if (order == null)
            return NotFound();
        
        return Ok(order);
    }

    [HttpGet("code/{orderCode}")]
    public async Task<IActionResult> GetByOrderCode(string orderCode, CancellationToken cancellationToken)
    {
        var query = new GetOrderByCodeQuery(orderCode);
        var order = await _sender.Send(query, cancellationToken);
        
        if (order == null)
            return NotFound();
        
        return Ok(order);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetByUserId(int userId, CancellationToken cancellationToken)
    {
        var query = new GetMyOrdersQuery(userId);
        var orders = await _sender.Send(query, cancellationToken);
        return Ok(orders);
    }

    [HttpPost("checkout")]
    public async Task<IActionResult> Checkout([FromBody] CheckoutCommand command, CancellationToken cancellationToken)
    {
        var order = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusRequest request, CancellationToken cancellationToken)
    {
        var command = new UpdateOrderStatusCommand(id, request.Status);
        var order = await _sender.Send(command, cancellationToken);
        
        if (order == null)
            return NotFound();

        return Ok(order);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var command = new DeleteOrderCommand(id);
        var success = await _sender.Send(command, cancellationToken);
        
        if (!success)
            return NotFound();

        return NoContent();
    }
}

public record UpdateStatusRequest(string Status, string? PaymentStatus);
