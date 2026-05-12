namespace Services.Catalog.Api.DTOs;

public class StockCheckResponse
{
    public bool Available { get; set; }
    public int StockQuantity { get; set; }
    public int? VariantId { get; set; }
    public string? Message { get; set; }
}
