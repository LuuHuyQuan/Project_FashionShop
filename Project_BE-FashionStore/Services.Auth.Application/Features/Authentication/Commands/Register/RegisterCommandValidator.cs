using FluentValidation;

namespace Services.Auth.Application.Features.Authentication.Commands.Register;

public sealed class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(x => x.FullName)
            .NotEmpty()
            .MinimumLength(3)
            .MaximumLength(200);

        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(255);

        RuleFor(x => x.Phone)
            .NotEmpty()
            .MaximumLength(20);

        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(6);

        RuleFor(x => x.Role)
            .NotEmpty()
            .MaximumLength(20);
    }
}
