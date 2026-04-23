using MediatR;
using Services.Auth.Application.Features.Users.Common;

namespace Services.Auth.Application.Features.Users.Queries.GetUsers;

public sealed record GetUsersQuery() : IRequest<IReadOnlyCollection<UserResponse>>;
