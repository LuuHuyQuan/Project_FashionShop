using Microsoft.AspNetCore.Mvc;
using Services.Auth.Application.Abstractions.Persistence;
using Services.Auth.Domain.Entities;

namespace Service.Auth.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UsersController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _userRepository.GetAllAsync();
        
        var response = users.Select(u => new
        {
            u.Id,
            u.FullName,
            u.Email,
            u.Phone,
            u.Role,
            u.Status,
            u.CreatedAt,
            u.UpdatedAt
        });
        
        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        
        if (user == null)
            return NotFound(new { message = "Không tìm thấy người dùng" });
        
        var response = new
        {
            user.Id,
            user.FullName,
            user.Email,
            user.Phone,
            user.Role,
            user.Status,
            user.CreatedAt,
            user.UpdatedAt
        };
        
        return Ok(response);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateUserRequest request)
    {
        var user = await _userRepository.GetByIdAsync(id);
        
        if (user == null)
            return NotFound(new { message = "Không tìm thấy người dùng" });

        user.UpdateProfile(request.FullName, request.Phone, request.Role, request.Status);
        await _userRepository.UpdateAsync(user);
        
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        
        if (user == null)
            return NotFound(new { message = "Không tìm thấy người dùng" });

        await _userRepository.DeleteAsync(id);
        return NoContent();
    }
}

public record UpdateUserRequest(
    string FullName,
    string Phone,
    string Role,
    string Status
);
