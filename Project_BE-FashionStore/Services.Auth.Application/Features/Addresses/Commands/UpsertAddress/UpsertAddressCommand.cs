using FluentValidation;
using MediatR;
using Services.Auth.Application.Features.Addresses.Common;

namespace Services.Auth.Application.Features.Addresses.Commands.UpsertAddress;

public sealed record UpsertAddressCommand(
    int UserId,
    int? Id,
    string RecipientName,
    string Phone,
    string AddressLine,
    string? City,
    string? District,
    string? Ward,
    bool IsDefault) : IRequest<AddressResponse>;

public sealed class UpsertAddressCommandValidator : AbstractValidator<UpsertAddressCommand>
{
    public UpsertAddressCommandValidator()
    {
        RuleFor(x => x.UserId).GreaterThan(0);
        RuleFor(x => x.RecipientName).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Phone).NotEmpty().MaximumLength(20);
        RuleFor(x => x.AddressLine).NotEmpty().MaximumLength(500);
        RuleFor(x => x.City).MaximumLength(100).When(x => !string.IsNullOrWhiteSpace(x.City));
        RuleFor(x => x.District).MaximumLength(100).When(x => !string.IsNullOrWhiteSpace(x.District));
        RuleFor(x => x.Ward).MaximumLength(100).When(x => !string.IsNullOrWhiteSpace(x.Ward));
    }
}
