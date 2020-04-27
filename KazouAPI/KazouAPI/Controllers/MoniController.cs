using KazouAPI.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KazouAPI.Controllers
{
    [Route("api/v1/monis")]
    public class MoniController: Controller
    {
        private readonly KazouContext context;
        public MoniController(KazouContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public List<Moni> GetAllMonis()
        {
            return context.Monis.ToList();
        }
    }
}
