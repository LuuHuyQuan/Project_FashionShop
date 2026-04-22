using BuildingBlocks.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Ordering.Application.Contracts;
using Services.Ordering.Application.Features.Addresses;

namespace Services.Ordering.Api.Controllers;

[ApiController]
[Route("api/addresses")]
[Authorize]
public sealed class AddressesController(IDispatcher dispatcher) : ControllerBase
{
    [HttpGet("user/{userId:int}")]
    [ProducesResponseType(typeof(IReadOnlyList<AddressDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetByUser(int userId, CancellationToken cancellationToken)
        => Ok(await dispatcher.Query(new GetAddressesByUserQuery(userId), cancellationToken));

    [HttpPost]
    [ProducesResponseType(typeof(AddressDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Create([FromBody] CreateAddressCommand command, CancellationToken cancellationToken)
        => Ok(await dispatcher.Send(command, cancellationToken));

    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(AddressDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateAddressRequest request, CancellationToken cancellationToken)
        => Ok(await dispatcher.Send(new UpdateAddressCommand(id, request.UserId, request.RecipientName, request.Phone, request.AddressLine, request.City, request.District, request.Ward, request.IsDefault), cancellationToken));

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        await dispatcher.Send(new DeleteAddressCommand(id), cancellationToken);
        return NoContent();
    }
}

public sealed record UpdateAddressRequest(int UserId, string RecipientName, string Phone, string AddressLine, string? City, string? District, string? Ward, bool IsDefault);
