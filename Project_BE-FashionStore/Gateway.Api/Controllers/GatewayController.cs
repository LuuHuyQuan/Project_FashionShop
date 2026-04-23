using Microsoft.AspNetCore.Mvc;

namespace Gateway.Api.Controllers;

[ApiController]
[Route("api/gateway")]
public sealed class GatewayController : ControllerBase
{
    [HttpGet("health")]
    public IActionResult Health()
    {
        return Ok(new
        {
            service = "Gateway.API",
            status = "Healthy",
            utc = DateTime.UtcNow
        });
    }
}
