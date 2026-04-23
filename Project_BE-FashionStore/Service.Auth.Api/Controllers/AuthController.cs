using MediatR;
using Microsoft.AspNetCore.Mvc;
using Services.Auth.Application.Features.Authentication.Commands.Login;
using Services.Auth.Application.Features.Authentication.Commands.RefreshToken;
using Services.Auth.Application.Features.Authentication.Commands.Register;

namespace Service.Auth.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ISender _sender;

    public AuthController(ISender sender)
    {
        _sender = sender;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var command = new RegisterCommand(request.FullName, request.Email, request.Phone, request.Password);
            var response = await _sender.Send(command, cancellationToken);
            return Ok(response);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var command = new LoginCommand(request.Email, request.Password);
            var response = await _sender.Send(command, cancellationToken);
            return Ok(response);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var command = new RefreshTokenCommand(request.RefreshToken);
            var response = await _sender.Send(command, cancellationToken);
            return Ok(response);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }
}

public record RegisterRequest(string FullName, string Email, string Phone, string Password);
public record LoginRequest(string Email, string Password);
public record RefreshRequest(string RefreshToken);
