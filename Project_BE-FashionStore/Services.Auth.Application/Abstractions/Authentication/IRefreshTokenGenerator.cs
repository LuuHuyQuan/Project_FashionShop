namespace Services.Auth.Application.Abstractions.Authentication;

public interface IRefreshTokenGenerator
{
    string Generate();
}
