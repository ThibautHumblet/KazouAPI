using KazouAPI.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KazouAPI.Controllers
{
    [Route("api/v1/destinations")]
    public class DestinationController : Controller
    {
        private readonly KazouContext context;
        public DestinationController(KazouContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public List<Destination> GetAllDestinations()
        {
            return context.Destinations.ToList();
        }
    }
}
