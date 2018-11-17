using IdentityModel.Client;
using System;

namespace ConsoleAppTest
{
    class Program
    {
        static TokenResponse response;
        static void Main(string[] args)
        {
            while (true)
            {
                try
                {
                    string action = QueryAction();
                    if (action == "Q")
                    {
                        break;
                    }
                    else if (action == "1")
                    {
                        response = IdentityServer4Client.LoginAsync("damienbod", "damienbod").Result;                        
                        Console.WriteLine("GOT TOKENS FROM IDENTITYSERVER4: {0}", response.AccessToken);
                    }
                    else if (action == "2")
                    {
                        ResourceDataClient.GetDataAndDisplayInConsoleAsync(response.AccessToken).Wait();

                    }
                    else if (action == "3")
                    {//Run an loop which gets refreshes the token every 3000 milliseconds
                        IdentityServer4Client.RunRefreshAsync(response).Wait();
                    }
                    else if (action == "4")
                    {//Run an loop which gets refreshes the token every 3000 milliseconds
                        IdentityServer4Client.RunRefreshAsync(response, 3000).Wait();
                    }
                    else if (action == "C")
                    {
                        Console.Clear();
                    }
                    else
                    {
                        Console.Write("Unknow Command!!\n");
                    }
                }
                catch (System.Exception e)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("Error: " + e.Message);
                    Console.ForegroundColor = ConsoleColor.White;
                }
            }
            Console.WriteLine("Program shutdown.");
        }
        private static string QueryAction()
        {
            Console.Write("\n"
                + "1) Login\n"
                + "2) GET DATA from the resource server\n"                
                + "3) gets refreshes the token every \n"
                + "4) Run an loop which gets refreshes the token every 3000 milliseconds\n"
                + "C) Clear\n"
                + "Q) Quit\n"
                + "Action: "
            );
            string cmd = Console.ReadLine().Trim().ToUpper();
            if (cmd.Length == 0)
                throw new System.Exception("Invalid action");

            return cmd;
        }
    }
}
