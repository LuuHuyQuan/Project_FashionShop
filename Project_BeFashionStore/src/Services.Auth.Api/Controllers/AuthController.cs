using System.Security.Claims;
using BuildingBlocks.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Auth.Application.Contracts;
using Services.Auth.Application.Features.Login;
using Services.Auth.Application.Features.Me;
using Services.Auth.Application.Features.Register;

namespace Services.Auth.Api.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController(IDispatcher dispatcher) : ControllerBase
{
    [HttpPost("register")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Register([FromBody] RegisterCommand command, CancellationToken cancellationToken)
    {
        var result = await dispatcher.Send(command, cancellationToken);
        return Ok(result);
    }

    [HttpPost("login")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Login([FromBody] LoginCommand command, CancellationToken cancellationToken)
    {
        var result = await dispatcher.Send(command, cancellationToken);
        return Ok(result);
    }

    [HttpGet("me")]
    [Authorize]
    [ProducesResponseType(typeof(AuthUserDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Me(CancellationToken cancellationToken)
    {
        var subject = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
        if (!int.TryParse(subject, out var userId))
        {
            return Unauthorized();
        }

        var result = await dispatcher.Query(new GetCurrentUserQuery(userId), cancellationToken);
        return Ok(result);
    }
}
