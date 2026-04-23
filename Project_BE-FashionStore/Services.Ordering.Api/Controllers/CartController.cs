using Microsoft.AspNetCore.Mvc;
using Services.Ordering.Infrastructure.Repositories;
using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly ICartRepository _cartRepository;

    public CartController(ICartRepository cartRepository)
    {
        _cartRepository = cartRepository;
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetByUserId(int userId)
    {
        var cart = await _cartRepository.GetByUserIdAsync(userId);
        if (cart == null)
        {
            // Create new cart if not exists
            cart = new Cart { UserId = userId };
            cart = await _cartRepository.CreateAsync(cart);
        }
        
        return Ok(cart);
    }

    [HttpPost("items")]
    public async Task<IActionResult> AddItem([FromBody] CartItem cartItem)
    {
        var added = await _cartRepository.AddItemAsync(cartItem);
        return Ok(added);
    }

    [HttpPut("items/{id}")]
    public async Task<IActionResult> UpdateItem(int id, [FromBody] CartItem cartItem)
    {
        if (id != cartItem.Id)
            return BadRequest();
        
        var updated = await _cartRepository.UpdateItemAsync(cartItem);
        return Ok(updated);
    }

    [HttpDelete("items/{id}")]
    public async Task<IActionResult> RemoveItem(int id)
    {
        await _cartRepository.RemoveItemAsync(id);
        return NoContent();
    }

    [HttpDelete("{cartId}/clear")]
    public async Task<IActionResult> ClearCart(int cartId)
    {
        await _cartRepository.ClearCartAsync(cartId);
        return NoContent();
    }
}
