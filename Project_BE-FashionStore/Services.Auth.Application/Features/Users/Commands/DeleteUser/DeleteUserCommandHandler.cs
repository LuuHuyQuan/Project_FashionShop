using MediatR;
using Services.Auth.Application.Abstractions.Persistence;

namespace Services.Auth.Application.Features.Users.Commands.DeleteUser;

public sealed class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, Unit>
{
    private readonly IUserRepository _userRepository;

    public DeleteUserCommandHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new KeyNotFoundException("User not found.");

        _userRepository.Remove(user);
        await _userRepository.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
