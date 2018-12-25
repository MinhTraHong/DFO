using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DFO.MainAPI.Extensions
{
    public static class HttpContextExtensions
    {
        private static IHttpContextAccessor httpContextAccessor;

        public static void Configure(IHttpContextAccessor httpContextAccessor)
        {
            HttpContextExtensions.httpContextAccessor = httpContextAccessor;
        }

        public static HttpContext HttpContext
        {
            get
            {
                if (httpContextAccessor == null)
                    return null;

                return httpContextAccessor.HttpContext;
            }
        }

        public static ClaimsIdentity Identity
        {
            get
            {
                if (httpContextAccessor == null)
                {
                    return new ClaimsIdentity()
                    {
                        Label = Guid.Empty.ToString()
                    };
                }

                return (HttpContextExtensions.HttpContext.User.Identity as ClaimsIdentity);
            }
        }

        public static Guid UserId
        {
            get
            {
                if (HttpContextExtensions.Identity.Label == null)
                    return Guid.Empty;

                return Guid.Parse(HttpContextExtensions.Identity.Label);
            }
        }

        public static string UserName
        {
            get
            {
                if (HttpContextExtensions.Identity.Name == null)
                    return "Anonymous";

                return HttpContextExtensions.Identity.Name;
            }
        }
    }
}
