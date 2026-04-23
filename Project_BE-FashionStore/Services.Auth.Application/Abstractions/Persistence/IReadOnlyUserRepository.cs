using Services.Auth.Application.Features.Users.Common;

namespace Services.Auth.Application.Abstractions.Persistence;

public interface IReadOnlyUserRepository
{
    Task<IReadOnlyCollection<UserResponse>> GetUsersAsync(CancellationToken cancellationToken = default);
}
