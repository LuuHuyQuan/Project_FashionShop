using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
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
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var query = new GetOrdersQuery();
        var orders = await _sender.Send(query, cancellationToken);
        return Ok(orders);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var query = new GetOrderByIdQuery(id);
        var order = await _sender.Send(query, cancellationToken);
        
        if (order == null)
            return NotFound();

        // Check if user owns this order (unless admin)
        var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (userRole != "admin" && userIdClaim != null)
        {
            if (int.TryParse(userIdClaim, out int userId) && order.UserId != userId)
            {
                return Forbid();
            }
        }
        
        return Ok(order);
    }

    [HttpGet("code/{orderCode}")]
    [Authorize]
    public async Task<IActionResult> GetByOrderCode(string orderCode, CancellationToken cancellationToken)
    {
        var query = new GetOrderByCodeQuery(orderCode);
        var order = await _sender.Send(query, cancellationToken);
        
        if (order == null)
            return NotFound();

        // Check if user owns this order (unless admin)
        var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (userRole != "admin" && userIdClaim != null)
        {
            if (int.TryParse(userIdClaim, out int userId) && order.UserId != userId)
            {
                return Forbid();
            }
        }
        
        return Ok(order);
    }

    [HttpGet("user/{userId}")]
    [Authorize]
    public async Task<IActionResult> GetByUserId(int userId, CancellationToken cancellationToken)
    {
        // Get the authenticated user's ID from token
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
        
        if (userIdClaim == null)
            return Unauthorized();

        // Only allow users to see their own orders (unless admin)
        if (userRole != "admin")
        {
            if (!int.TryParse(userIdClaim, out int authenticatedUserId) || authenticatedUserId != userId)
            {
                return Forbid();
            }
        }

        var query = new GetMyOrdersQuery(userId);
        var orders = await _sender.Send(query, cancellationToken);
        return Ok(orders);
    }

    [HttpGet("my-orders")]
    [Authorize]
    public async Task<IActionResult> GetMyOrders(CancellationToken cancellationToken)
    {
        // Get the authenticated user's ID from token
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();

        var query = new GetMyOrdersQuery(userId);
        var orders = await _sender.Send(query, cancellationToken);
        return Ok(orders);
    }

    [HttpPost("checkout")]
    [Authorize]
    public async Task<IActionResult> Checkout([FromBody] CheckoutCommand command, CancellationToken cancellationToken)
    {
        // Verify the user is checking out their own cart
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();

        if (command.UserId != userId)
            return Forbid();

        var order = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
    }

    [HttpPut("{id}/status")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusRequest request, CancellationToken cancellationToken)
    {
        var command = new UpdateOrderStatusCommand(id, request.Status);
        var order = await _sender.Send(command, cancellationToken);
        
        if (order == null)
            return NotFound();

        return Ok(order);
    }

    [HttpPost("{id}/cancel")]
    [Authorize]
    public async Task<IActionResult> CancelOrder(int id, CancellationToken cancellationToken)
    {
        // Get the authenticated user's ID from token
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
        
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();

        // Get the order
        var query = new GetOrderByIdQuery(id);
        var order = await _sender.Send(query, cancellationToken);
        
        if (order == null)
            return NotFound(new { message = "Không tìm thấy đơn hàng" });

        // Check if user owns this order (unless admin)
        if (userRole != "admin" && order.UserId != userId)
        {
            return Forbid();
        }

        // Check if order can be cancelled (only pending or processing)
        var currentStatus = order.Status.ToLower();
        if (currentStatus != "pending" && currentStatus != "processing")
        {
            return BadRequest(new { message = "Chỉ có thể hủy đơn hàng đang chờ xử lý hoặc đang xử lý" });
        }

        // Update status to cancelled
        var command = new UpdateOrderStatusCommand(id, "cancelled");
        var updatedOrder = await _sender.Send(command, cancellationToken);
        
        return Ok(new { message = "Đã hủy đơn hàng thành công", order = updatedOrder });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
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
