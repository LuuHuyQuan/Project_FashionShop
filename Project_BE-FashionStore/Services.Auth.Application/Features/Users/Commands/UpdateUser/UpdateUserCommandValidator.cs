using FluentValidation;

namespace Services.Auth.Application.Features.Users.Commands.UpdateUser;

public sealed class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
{
    public UpdateUserCommandValidator()
    {
        RuleFor(x => x.Id).GreaterThan(0);
        RuleFor(x => x.FullName).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Phone).NotEmpty().MaximumLength(20);
        RuleFor(x => x.Role).NotEmpty().MaximumLength(20);
        RuleFor(x => x.Status).NotEmpty().MaximumLength(20);
    }
}
