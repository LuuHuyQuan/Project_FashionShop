using MediatR;
using Services.Ordering.Application.Features.Carts.Common;

namespace Services.Ordering.Application.Features.Carts.Queries.GetMyCart;

public sealed record GetMyCartQuery(int UserId) : IRequest<CartResponse>;
