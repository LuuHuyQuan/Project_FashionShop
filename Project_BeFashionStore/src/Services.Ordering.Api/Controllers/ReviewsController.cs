using BuildingBlocks.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Ordering.Application.Contracts;
using Services.Ordering.Application.Features.Reviews;

namespace Services.Ordering.Api.Controllers;

[ApiController]
[Route("api/reviews")]
public sealed class ReviewsController(IDispatcher dispatcher) : ControllerBase
{
    [HttpGet("product/{productId:int}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IReadOnlyList<ReviewDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetByProduct(int productId, CancellationToken cancellationToken)
        => Ok(await dispatcher.Query(new GetReviewsByProductQuery(productId), cancellationToken));

    [HttpPost]
    [Authorize]
    [ProducesResponseType(typeof(ReviewDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Create([FromBody] CreateReviewCommand command, CancellationToken cancellationToken)
        => Ok(await dispatcher.Send(command, cancellationToken));

    [HttpPut("{id:int}")]
    [Authorize]
    [ProducesResponseType(typeof(ReviewDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateReviewRequest request, CancellationToken cancellationToken)
        => Ok(await dispatcher.Send(new UpdateReviewCommand(id, request.Rating, request.Comment), cancellationToken));

    [HttpDelete("{id:int}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        await dispatcher.Send(new DeleteReviewCommand(id), cancellationToken);
        return NoContent();
    }
}

public sealed record UpdateReviewRequest(int Rating, string? Comment);
