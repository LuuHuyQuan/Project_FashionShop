using Services.Catalog.Application;
using Services.Catalog.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication();

// Add Infrastructure (DbContext + Repositories)
builder.Services.AddInfrastructure(builder.Configuration);

// TODO: Add JWT Authentication later
// var jwtSettings = builder.Configuration.GetSection("Jwt");
// var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]!);
// builder.Services.AddAuthentication(...)
// builder.Services.AddAuthorization();

// Add Controllers
builder.Services.AddControllers()
    .AddJsonOptions(options => 
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
// app.UseAuthentication();
// app.UseAuthorization();
app.MapControllers();

app.Run();
