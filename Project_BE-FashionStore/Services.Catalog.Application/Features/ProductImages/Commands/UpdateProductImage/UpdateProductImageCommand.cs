using MediatR;

namespace Services.Catalog.Application.Features.ProductImages.Commands.UpdateProductImage;

public record UpdateProductImageCommand(
    int Id,
    int ProductId,
    string Url,
    bool IsThumbnail,
    int SortOrder
) : IRequest<bool>;
