using MediatR;

namespace Services.Auth.Application.Features.Authentication.Queries.GetCurrentUser;

public sealed record GetCurrentUserQuery(int UserId) : IRequest<CurrentUserResponse>;
