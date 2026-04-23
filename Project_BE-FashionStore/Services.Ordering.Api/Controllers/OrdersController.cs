using Microsoft.AspNetCore.Mvc;
using Services.Ordering.Infrastructure.Repositories;
using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderRepository _orderRepository;

    public OrdersController(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var orders = await _orderRepository.GetAllAsync();
        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var order = await _orderRepository.GetByIdAsync(id);
        if (order == null)
            return NotFound();
        
        return Ok(order);
    }

    [HttpGet("code/{orderCode}")]
    public async Task<IActionResult> GetByOrderCode(string orderCode)
    {
        var order = await _orderRepository.GetByOrderCodeAsync(orderCode);
        if (order == null)
            return NotFound();
        
        return Ok(order);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetByUserId(int userId)
    {
        var orders = await _orderRepository.GetByUserIdAsync(userId);
        return Ok(orders);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Order order)
    {
        // Generate order code
        order.OrderCode = $"ORD{DateTime.UtcNow:yyyyMMddHHmmss}";
        
        var created = await _orderRepository.CreateAsync(order);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Order order)
    {
        if (id != order.Id)
            return BadRequest();
        
        var updated = await _orderRepository.UpdateAsync(order);
        return Ok(updated);
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusRequest request)
    {
        var order = await _orderRepository.GetByIdAsync(id);
        if (order == null)
            return NotFound();
        
        order.Status = request.Status;
        var updated = await _orderRepository.UpdateAsync(order);
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _orderRepository.DeleteAsync(id);
        return NoContent();
    }
}

public record UpdateStatusRequest(string Status);
