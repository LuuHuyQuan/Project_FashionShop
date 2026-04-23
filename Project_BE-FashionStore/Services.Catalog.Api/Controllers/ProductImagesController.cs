using MediatR;
using Microsoft.AspNetCore.Mvc;
using Services.Catalog.Api.DTOs;
using Services.Catalog.Application.Features.ProductImages.Commands.CreateProductImage;
using Services.Catalog.Application.Features.ProductImages.Commands.DeleteProductImage;
using Services.Catalog.Application.Features.ProductImages.Commands.UpdateProductImage;
using Services.Catalog.Application.Features.ProductImages.Queries.GetProductImageById;
using Services.Catalog.Application.Features.ProductImages.Queries.GetProductImages;

namespace Services.Catalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductImagesController : ControllerBase
{
    private readonly ISender _sender;

    public ProductImagesController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var query = new GetProductImagesQuery();
        var images = await _sender.Send(query, cancellationToken);
        return Ok(images);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var query = new GetProductImageByIdQuery(id);
        var image = await _sender.Send(query, cancellationToken);
        
        if (image == null)
            return NotFound();
        
        return Ok(image);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProductImageRequest request, CancellationToken cancellationToken)
    {
        var command = new CreateProductImageCommand(
            request.ProductId,
            request.Url,
            request.IsThumbnail,
            request.SortOrder
        );

        var created = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateProductImageRequest request, CancellationToken cancellationToken)
    {
        var command = new UpdateProductImageCommand(
            id,
            request.ProductId,
            request.Url,
            request.IsThumbnail,
            request.SortOrder
        );

        var success = await _sender.Send(command, cancellationToken);
        
        if (!success)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var command = new DeleteProductImageCommand(id);
        var success = await _sender.Send(command, cancellationToken);
        
        if (!success)
            return NotFound();

        return NoContent();
    }
}
