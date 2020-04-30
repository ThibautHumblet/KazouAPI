using KazouAPI.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KazouAPI.Controllers
{
    [Route("api/v1/profiles")]
    public class ProfileController : Controller
    {
        private readonly KazouContext context;
        public ProfileController(KazouContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public List<Profile> GetAllProfiles()
        {
            return context.Profiles.ToList();
        }
    }
}
