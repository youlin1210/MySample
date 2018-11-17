using IdentityModel;
using IdentityModel.Client;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppTest
{
    public static class IdentityServer4Client
    {
        private static TokenClient _tokenClient;

        public static async Task<TokenResponse> LoginAsync(string user, string password)
        {
            Console.Title = "Console ResourceOwner Flow RefreshToken";

            var disco = await DiscoveryClient.GetAsync("https://localhost:44318");
            if (disco.IsError) throw new Exception(disco.Error);

            _tokenClient = new TokenClient(
                disco.TokenEndpoint,
                "resourceownerclient",
                "dataEventRecordsSecret");

            return await RequestTokenAsync(user, password);
        }

        public static async Task RunRefreshAsync(TokenResponse response, int milliseconds)
        {
            var refresh_token = response.RefreshToken;

            while (true)
            {
                response = await RefreshTokenAsync(refresh_token);

                // Get the resource data using the new tokens...
                await ResourceDataClient.GetDataAndDisplayInConsoleAsync(response.AccessToken);

                if (response.RefreshToken != refresh_token)
                {
                    ShowResponse(response);
                    refresh_token = response.RefreshToken;
                }

                Task.Delay(milliseconds).Wait();
            }
        }
        public static async Task RunRefreshAsync(TokenResponse response)
        {
            string refresh_token = response.RefreshToken;           
                response = await RefreshTokenAsync(refresh_token);
                // Get the resource data using the new tokens...
                await ResourceDataClient.GetDataAndDisplayInConsoleAsync(response.AccessToken);                
                ShowResponse(response);    
        }
        private static async Task<TokenResponse> RequestTokenAsync(string user, string password)
        {
            Console.WriteLine("begin RequestTokenAsync");
            return await _tokenClient.RequestResourceOwnerPasswordAsync(
                user,
                password,
                "email openid dataEventRecords offline_access");
        }

        private static async Task<TokenResponse> RefreshTokenAsync(string refreshToken)
        {
            Console.WriteLine("Using refresh token: {0}", refreshToken);

            return await _tokenClient.RequestRefreshTokenAsync(refreshToken);
        }

        private static void ShowResponse(TokenResponse response)
        {
            if (!response.IsError)
            {
                Console.WriteLine("Token response: {0}", response.Json.ToString());

                if (response.AccessToken.Contains("."))
                {
                    var parts = response.AccessToken.Split('.');
                    var header = parts[0];
                    var claims = parts[1];

                    Console.WriteLine("Access Token Header decoded {0}", JObject.Parse(Encoding.UTF8.GetString(Base64Url.Decode(header))).ToString());
                    Console.WriteLine("Access Token claims decoded {0}", JObject.Parse(Encoding.UTF8.GetString(Base64Url.Decode(claims))).ToString());
                }
            }
            else
            {
                if (response.ErrorType == ResponseErrorType.Http)
                {
                    Console.WriteLine("HTTP error:  {0}", response.Error);
                    Console.WriteLine("HTTP status code:  {0}", response.HttpStatusCode);
                }
                else
                {
                    Console.WriteLine("Protocol error response: {0}", response.Json);
                }
            }
        }
    }
}
