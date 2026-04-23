using MediatR;
using Services.Catalog.Application.Features.Sizes.Common;

namespace Services.Catalog.Application.Features.Sizes.Queries.GetSizeById;

public record GetSizeByIdQuery(int Id) : IRequest<SizeResponse?>;
