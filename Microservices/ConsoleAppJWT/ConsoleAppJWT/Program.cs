using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using System;
using System.Collections.Generic;

namespace ConsoleAppJWT
{
    /// <summary>
    /// https://jwt.io/
    /// </summary>
    class Program
    {
        static string secret = "GQDstcKsx0NHjPOuXOYg5MbeJ1XT0uFiwDVvVBrk"; //自定義的密錀  your-256-bit-secret
        static string secret2 = "aaaaaaaaaaaaaaaa"; //自定義的密錀  your-256-bit-secret
        static void Main(string[] args)
        {
            var payload = new Dictionary<string, string> //模擬到時候伺服器想接收的資料
	        {
                { "id", "A123456789" },
                { "role", "EC" }
            };   

            string token = EnCodeJwt(payload);

            Console.WriteLine(token);

            Console.WriteLine(DeCodeJwt(token));

            Console.ReadLine();
            

        }

        static string EnCodeJwt(Dictionary<string, string> userInfo)
        {
            IJsonSerializer serializer = new JsonNetSerializer();
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();

            IJwtAlgorithm algorithm = new HMACSHA256Algorithm();   //ALGORITHM
            IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);
            string token = encoder.Encode(userInfo, secret);
            return token;
        }

        static string DeCodeJwt(string token)
        {
            string json = "",json2="";
            try
            {
                IJsonSerializer serializer = new JsonNetSerializer();
                IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();

                IDateTimeProvider provider = new UtcDateTimeProvider();
                IJwtValidator validator = new JwtValidator(serializer, provider);
                IJwtDecoder decoder = new JwtDecoder(serializer, validator, urlEncoder);

                Console.WriteLine(decoder.Decode(token));//未驗證真假,但已經看得了內容

                json = decoder.Decode(token, secret, verify: true);//Signature Verified  經過驗證
                json2 = decoder.Decode(token, secret2, verify: true);//Signature Verified  經過驗證
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return json;
        }
    }
}
