using MediatR;

namespace Services.Catalog.Application.Features.ProductImages.Commands.DeleteProductImage;

public record DeleteProductImageCommand(int Id) : IRequest<bool>;
