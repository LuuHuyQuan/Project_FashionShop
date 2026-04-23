using MediatR;
using Services.Auth.Application.Abstractions.Persistence;

namespace Services.Auth.Application.Features.Authentication.Queries.GetCurrentUser;

public sealed class GetCurrentUserQueryHandler : IRequestHandler<GetCurrentUserQuery, CurrentUserResponse>
{
    private readonly IUserRepository _userRepository;

    public GetCurrentUserQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<CurrentUserResponse> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(request.UserId, cancellationToken)
            ?? throw new KeyNotFoundException("User not found.");

        return new CurrentUserResponse(
            user.Id,
            user.FullName,
            user.Email,
            user.Phone,
            user.Role,
            user.Status,
            user.CreatedAt,
            user.UpdatedAt);
    }
}
