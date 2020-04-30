using KazouAPI.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KazouAPI.Controllers
{
    [Route("api/v1/workers")]
    public class WorkerController: Controller
    {
        private readonly KazouContext context;
        public WorkerController(KazouContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public List<Worker> GetAllWorkers()
        {
            return context.Workers.ToList();
        }
    }
}
