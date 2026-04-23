namespace Services.Auth.Application.Features.Addresses.Common;

public sealed record AddressResponse(
    int Id,
    string RecipientName,
    string Phone,
    string AddressLine,
    string? City,
    string? District,
    string? Ward,
    bool IsDefault);
