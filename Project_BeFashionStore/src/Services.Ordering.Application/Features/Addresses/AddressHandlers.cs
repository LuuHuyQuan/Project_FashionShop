using BuildingBlocks.Application;
using Services.Ordering.Application.Abstractions;
using Services.Ordering.Application.Contracts;
using Services.Ordering.Domain.Entities;

namespace Services.Ordering.Application.Features.Addresses;

public sealed record CreateAddressCommand(int UserId, string RecipientName, string Phone, string AddressLine, string? City, string? District, string? Ward, bool IsDefault) : ICommand<AddressDto>;
public sealed record UpdateAddressCommand(int Id, int UserId, string RecipientName, string Phone, string AddressLine, string? City, string? District, string? Ward, bool IsDefault) : ICommand<AddressDto>;
public sealed record DeleteAddressCommand(int Id) : ICommand<bool>;
public sealed record GetAddressesByUserQuery(int UserId) : IQuery<IReadOnlyList<AddressDto>>;

public sealed class CreateAddressCommandHandler(IOrderingDbContext dbContext) : ICommandHandler<CreateAddressCommand, AddressDto>
{
    public async Task<AddressDto> Handle(CreateAddressCommand command, CancellationToken cancellationToken)
    {
        var address = new Address
        {
            UserId = command.UserId,
            RecipientName = command.RecipientName.Trim(),
            Phone = command.Phone.Trim(),
            AddressLine = command.AddressLine.Trim(),
            City = command.City,
            District = command.District,
            Ward = command.Ward,
            IsDefault = command.IsDefault
        };

        await dbContext.AddAddressAsync(address, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
        return Map(address);
    }

    internal static AddressDto Map(Address address) => new(address.Id, address.UserId, address.RecipientName, address.Phone, address.AddressLine, address.City, address.District, address.Ward, address.IsDefault);
}

public sealed class UpdateAddressCommandHandler(IOrderingDbContext dbContext) : ICommandHandler<UpdateAddressCommand, AddressDto>
{
    public async Task<AddressDto> Handle(UpdateAddressCommand command, CancellationToken cancellationToken)
    {
        var address = dbContext.Addresses.FirstOrDefault(x => x.Id == command.Id)
            ?? throw new KeyNotFoundException("Address not found.");

        address.UserId = command.UserId;
        address.RecipientName = command.RecipientName.Trim();
        address.Phone = command.Phone.Trim();
        address.AddressLine = command.AddressLine.Trim();
        address.City = command.City;
        address.District = command.District;
        address.Ward = command.Ward;
        address.IsDefault = command.IsDefault;

        await dbContext.SaveChangesAsync(cancellationToken);
        return CreateAddressCommandHandler.Map(address);
    }
}

public sealed class DeleteAddressCommandHandler(IOrderingDbContext dbContext) : ICommandHandler<DeleteAddressCommand, bool>
{
    public async Task<bool> Handle(DeleteAddressCommand command, CancellationToken cancellationToken)
    {
        var address = dbContext.Addresses.FirstOrDefault(x => x.Id == command.Id)
            ?? throw new KeyNotFoundException("Address not found.");
        dbContext.RemoveAddress(address);
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }
}

public sealed class GetAddressesByUserQueryHandler(IOrderingDbContext dbContext) : IQueryHandler<GetAddressesByUserQuery, IReadOnlyList<AddressDto>>
{
    public Task<IReadOnlyList<AddressDto>> Handle(GetAddressesByUserQuery query, CancellationToken cancellationToken)
    {
        IReadOnlyList<AddressDto> items = dbContext.Addresses
            .Where(x => x.UserId == query.UserId)
            .OrderByDescending(x => x.IsDefault)
            .ThenByDescending(x => x.Id)
            .Select(x => new AddressDto(x.Id, x.UserId, x.RecipientName, x.Phone, x.AddressLine, x.City, x.District, x.Ward, x.IsDefault))
            .ToList();

        return Task.FromResult(items);
    }
}
