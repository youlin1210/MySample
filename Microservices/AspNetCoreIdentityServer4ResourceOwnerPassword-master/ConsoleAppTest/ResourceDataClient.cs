using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppTest
{
    public static class ResourceDataClient
    {
        public static async Task GetDataAndDisplayInConsoleAsync(string access_token)
        {
            HttpClient httpClient = new HttpClient();
            httpClient.SetBearerToken(access_token);

            var payloadFromResourceServer = await httpClient.GetAsync("https://localhost:44365/api/DataEventRecords");
            if (!payloadFromResourceServer.IsSuccessStatusCode)
            {
                Console.WriteLine("Response unsuccessful: {0}", payloadFromResourceServer.StatusCode);
            }
            else
            {
                var content = await payloadFromResourceServer.Content.ReadAsStringAsync();
                Console.WriteLine("Response successful: {0}", payloadFromResourceServer.StatusCode);
                Console.WriteLine("Response successful: {0}", content);
            }

        }
    }
}
