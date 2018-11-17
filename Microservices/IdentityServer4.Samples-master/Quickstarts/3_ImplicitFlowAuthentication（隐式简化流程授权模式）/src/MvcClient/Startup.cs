using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System.IdentityModel.Tokens.Jwt;

namespace MvcClient
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            //配置 OpenID Connect 认证   https://identityserver4.readthedocs.io/en/release/quickstarts/3_interactive_login.html
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            services.AddAuthentication(options =>
                {
                    options.DefaultScheme = "Cookies";//使用Cookie作为验证用户的主要方法
                    options.DefaultChallengeScheme = "oidc";//使用OpenID Connect方案
                })
                .AddCookie("Cookies")//添加可以处理Cookie的处理程序
                .AddOpenIdConnect("oidc", options =>
                {//用于配置执行OpenID Connect协议的处理程序
                    options.SignInScheme = "Cookies";//用于在OpenID Connect协议完成后使用cookie处理程序发出cookie

                    options.Authority = "http://localhost:5100";//表示IdentityServer4服务的地址
                    options.RequireHttpsMetadata = false;

                    options.ClientId = "mvc";//识别该客户端
                    options.SaveTokens = true;//用于在Cookie中保存IdentityServer中的令牌
                });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseAuthentication();//验证中间件应该在MVC之前添加

            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
        }
    }
}