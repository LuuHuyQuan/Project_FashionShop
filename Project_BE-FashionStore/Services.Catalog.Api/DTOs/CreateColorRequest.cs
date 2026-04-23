namespace Services.Catalog.Api.DTOs;

public record CreateColorRequest(
    string Name,
    string HexCode);
