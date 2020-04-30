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

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetWorker(int id)
        {
            Worker worker = context.Workers.Find(id);
            if (worker == null)
                return NotFound();
            return Ok(worker);
        }

        [HttpPost]
        public IActionResult CreateWorker([FromBody] Worker newWorker)
        {
            context.Workers.Add(newWorker);
            context.SaveChanges();
            return Created("", newWorker);
        }

        [HttpPut]
        public IActionResult UpdateWorker([FromBody] Worker updateWorker)
        {
            Worker originalWorker = context.Workers.Find(updateWorker.WorkerID);
            if (originalWorker == null)
                return NotFound();

            originalWorker.FirstName = updateWorker.FirstName;
            originalWorker.LastName = updateWorker.LastName;
            originalWorker.BirthDay = updateWorker.BirthDay;
            context.SaveChanges();
            return Ok(originalWorker);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteWorker(int id)
        {
            Worker worker = context.Workers.Find(id);
            if (worker == null)
                return NotFound();
            context.Workers.Remove(worker);
            context.SaveChanges();
            return NoContent();
        }
    }
}
