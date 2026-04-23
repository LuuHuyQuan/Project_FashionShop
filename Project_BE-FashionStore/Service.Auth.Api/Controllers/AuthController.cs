using Microsoft.AspNetCore.Mvc;
using Services.Auth.Infrastructure.Repositories;
using Services.Auth.Domain.Entities;
using BCrypt.Net;

namespace Service.Auth.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public AuthController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        // Check if email exists
        if (await _userRepository.EmailExistsAsync(request.Email))
            return BadRequest(new { message = "Email already exists" });

        // Hash password
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            Phone = request.Phone,
            PasswordHash = passwordHash,
            Role = "customer",
            Status = "active"
        };

        var created = await _userRepository.CreateAsync(user);
        
        return Ok(new
        {
            id = created.Id,
            fullName = created.FullName,
            email = created.Email,
            phone = created.Phone,
            role = created.Role
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email);
        
        if (user == null)
            return Unauthorized(new { message = "Invalid email or password" });

        // Verify password
        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return Unauthorized(new { message = "Invalid email or password" });

        if (user.Status != "active")
            return Unauthorized(new { message = "Account is inactive" });

        // TODO: Generate JWT token
        return Ok(new
        {
            id = user.Id,
            fullName = user.FullName,
            email = user.Email,
            phone = user.Phone,
            role = user.Role,
            token = "JWT_TOKEN_HERE" // Implement JWT generation
        });
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userRepository.GetAllAsync();
        return Ok(users);
    }

    [HttpGet("users/{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null)
            return NotFound();
        
        return Ok(user);
    }
}

public record RegisterRequest(string FullName, string Email, string Phone, string Password);
public record LoginRequest(string Email, string Password);
