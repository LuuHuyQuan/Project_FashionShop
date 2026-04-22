using BuildingBlocks.Application;
using Services.Auth.Application.Abstractions;
using Services.Auth.Application.Contracts;

namespace Services.Auth.Application.Features.Me;

public sealed record GetCurrentUserQuery(int UserId) : IQuery<AuthUserDto>;

public sealed class GetCurrentUserQueryHandler(IAuthDbContext dbContext)
    : IQueryHandler<GetCurrentUserQuery, AuthUserDto>
{
    public Task<AuthUserDto> Handle(GetCurrentUserQuery query, CancellationToken cancellationToken)
    {
        var user = dbContext.Users.FirstOrDefault(x => x.Id == query.UserId)
            ?? throw new KeyNotFoundException("User not found.");

        return Task.FromResult(new AuthUserDto(
            user.Id,
            user.FullName,
            user.Email,
            user.Phone,
            user.Role,
            user.Status));
    }
}
