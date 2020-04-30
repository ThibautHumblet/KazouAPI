using KazouAPI.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KazouAPI.Controllers
{
    [Route("api/v1/vacations")]
    public class VacationController : Controller
    {
        private readonly KazouContext context;
        public VacationController(KazouContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public List<Vacation> GetAllVacations()
        {
            return context.Vacations.Include(i => i.Destination).ToList();
        }
    }
}
