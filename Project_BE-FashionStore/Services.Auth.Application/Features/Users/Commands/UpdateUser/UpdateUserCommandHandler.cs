using MediatR;
using Services.Auth.Application.Abstractions.Persistence;

namespace Services.Auth.Application.Features.Users.Commands.UpdateUser;

public sealed class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, Unit>
{
    private readonly IUserRepository _userRepository;

    public UpdateUserCommandHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<Unit> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(request.Id)
            ?? throw new KeyNotFoundException("User not found.");

        user.UpdateProfile(request.FullName, request.Phone, request.Role, request.Status);
        await _userRepository.UpdateAsync(user);

        return Unit.Value;
    }
}
