using KazouAPI.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KazouAPI.Controllers
{
    [Route("api/v1/involvements")]
    public class InvolvementController : Controller
    {
        private readonly KazouContext context;
        public InvolvementController(KazouContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public List<Involvement> GetAllInvolvements()
        {
            return context.Involvements.Include(i => i.Vacation).Include(i => i.Worker).Include(i => i.Profile).ToList();
        }
    }
}
