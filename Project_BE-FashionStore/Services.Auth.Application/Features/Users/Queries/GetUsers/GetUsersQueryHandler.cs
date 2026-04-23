using MediatR;
using Services.Auth.Application.Abstractions.Persistence;
using Services.Auth.Application.Features.Users.Common;

namespace Services.Auth.Application.Features.Users.Queries.GetUsers;

public sealed class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, IReadOnlyCollection<UserResponse>>
{
    private readonly IReadOnlyUserRepository _readOnlyUserRepository;

    public GetUsersQueryHandler(IReadOnlyUserRepository readOnlyUserRepository)
    {
        _readOnlyUserRepository = readOnlyUserRepository;
    }

    public Task<IReadOnlyCollection<UserResponse>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
    {
        return _readOnlyUserRepository.GetUsersAsync(cancellationToken);
    }
}
