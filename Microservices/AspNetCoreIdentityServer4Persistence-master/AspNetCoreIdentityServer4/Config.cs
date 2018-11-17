﻿// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

using IdentityServer4.Models;
using System.Collections.Generic;

namespace QuickstartIdentityServer
{
    public class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(), 
                new IdentityResource("dataeventrecordsscope",new []{ "role", "admin", "user", "dataEventRecords", "dataEventRecords.admin" , "dataEventRecords.user" } ),
                new IdentityResource("securedfilesscope",new []{ "role", "admin", "user", "securedFiles", "securedFiles.admin", "securedFiles.user"} )
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("dataEventRecords")
                {
                    ApiSecrets =
                    {
                        new Secret("dataEventRecordsSecret".Sha256())
                    },
                    Scopes =
                    {
                        new Scope
                        {
                            Name = "dataeventrecordsscope",
                            DisplayName = "Scope for the dataEventRecords ApiResource"
                        }
                    },
                    UserClaims = { "role", "admin", "user", "dataEventRecords", "dataEventRecords.admin", "dataEventRecords.user" }
                },
                new ApiResource("securedFiles")
                {
                    ApiSecrets =
                    {
                        new Secret("securedFilesSecret".Sha256())
                    },
                    Scopes =
                    {
                        new Scope
                        {
                            Name = "securedfilesscope",
                            DisplayName = "Scope for the securedFiles ApiResource"
                        }
                    },
                    UserClaims = { "role", "admin", "user", "securedFiles", "securedFiles.admin", "securedFiles.user" }
                }
            };
        }

        // clients want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients()
        {
            // client credentials client
            return new List<Client>
            {
                new Client
                {
                    ClientName = "ClientOne",
                    ClientId = "ClientOne",
                    AccessTokenType = AccessTokenType.Reference,
                    AccessTokenLifetime = 360,// 120 seconds, default 60 minutes
                    IdentityTokenLifetime = 300,
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AlwaysIncludeUserClaimsInIdToken = true,
                    AllowAccessTokensViaBrowser = true,
                    RedirectUris = new List<string>
                    {
                        "https://localhost:44372"

                    },
                    PostLogoutRedirectUris = new List<string>
                    {
                        "https://localhost:44372/Unauthorized"
                    },
                    AllowedCorsOrigins = new List<string>
                    {
                        "https://localhost:44372",
                        "http://localhost:44372"
                    },
                    AllowedScopes = new List<string>
                    {
                        "openid",
                        "dataEventRecords",
                        "dataeventrecordsscope",
                        "securedFiles",
                        "securedfilesscope",
                        "role",
                        "profile",
                        "email"
                    }
},
                new Client
                {
                    ClientName = "ClientTwo",
                    ClientId = "ClientTwo",
                    AccessTokenType = AccessTokenType.Reference,
                    AccessTokenLifetime = 330,// 330 seconds, default 60 minutes
                    IdentityTokenLifetime = 300,
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RedirectUris = new List<string>
                    {
                        "https://localhost:44395"

                    },
                    PostLogoutRedirectUris = new List<string>
                    {
                        "https://localhost:44395/unauthorized",
                        "https://localhost:44395"
                    },
                    AllowedCorsOrigins = new List<string>
                    {
                        "https://localhost:44395",
                        "http://localhost:44395"
                    },
                    AllowedScopes = new List<string>
                    {
                        "openid",
                        "dataEventRecords",
                        "dataeventrecordsscope",
                        "securedFiles",
                        "securedfilesscope",
                        "role",
                        "profile",
                        "email"
                    }
                }
            };
        }
    }
}