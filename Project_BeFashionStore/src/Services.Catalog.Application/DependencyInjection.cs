using Microsoft.Extensions.DependencyInjection;
using BuildingBlocks.Application;
using Services.Catalog.Application.Contracts;
using Services.Catalog.Application.Features.Categories;
using Services.Catalog.Application.Features.Products;
using Services.Catalog.Application.Features.Variants;

namespace Services.Catalog.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddCatalogApplication(this IServiceCollection services)
    {
        services.AddDispatcher();

        services.AddScoped<ICommandHandler<CreateCategoryCommand, CategoryDto>, CreateCategoryCommandHandler>();
        services.AddScoped<ICommandHandler<UpdateCategoryCommand, CategoryDto>, UpdateCategoryCommandHandler>();
        services.AddScoped<ICommandHandler<DeleteCategoryCommand, bool>, DeleteCategoryCommandHandler>();
        services.AddScoped<IQueryHandler<GetCategoryByIdQuery, CategoryDto>, GetCategoryByIdQueryHandler>();
        services.AddScoped<IQueryHandler<GetCategoriesQuery, IReadOnlyList<CategoryDto>>, GetCategoriesQueryHandler>();

        services.AddScoped<ICommandHandler<CreateProductCommand, ProductDto>, CreateProductCommandHandler>();
        services.AddScoped<ICommandHandler<UpdateProductCommand, ProductDto>, UpdateProductCommandHandler>();
        services.AddScoped<ICommandHandler<DeleteProductCommand, bool>, DeleteProductCommandHandler>();
        services.AddScoped<IQueryHandler<GetProductByIdQuery, ProductDto>, GetProductByIdQueryHandler>();
        services.AddScoped<IQueryHandler<GetProductsQuery, IReadOnlyList<ProductDto>>, GetProductsQueryHandler>();

        services.AddScoped<ICommandHandler<CreateProductVariantCommand, ProductVariantDto>, CreateProductVariantCommandHandler>();
        services.AddScoped<ICommandHandler<UpdateProductVariantCommand, ProductVariantDto>, UpdateProductVariantCommandHandler>();
        services.AddScoped<ICommandHandler<DeleteProductVariantCommand, bool>, DeleteProductVariantCommandHandler>();
        services.AddScoped<IQueryHandler<GetProductVariantsQuery, IReadOnlyList<ProductVariantDto>>, GetProductVariantsQueryHandler>();

        return services;
    }
}
