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

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetVacation(int id)
        {
            Vacation vacation = context.Vacations.Include(d => d.Destination).SingleOrDefault(d => d.VacationID == id);
            if (vacation == null)
                return NotFound();
            return Ok(vacation);
        }

        [HttpPost]
        public IActionResult CreateVacation([FromBody] Vacation newVacation)
        {
            context.Vacations.Add(newVacation);
            context.SaveChanges();
            return Created("", newVacation);
        }

        [HttpPut]
        public IActionResult UpdateVacation([FromBody] Vacation updateVacation)
        {
            Vacation originalVacation = context.Vacations.Find(updateVacation.VacationID);
            if (originalVacation == null)
                return NotFound();

            originalVacation.Name = updateVacation.Name;
            originalVacation.DestinationID = updateVacation.DestinationID;
            originalVacation.StartDate = updateVacation.StartDate;
            originalVacation.EndDate = updateVacation.EndDate;
            context.SaveChanges();
            return Ok(originalVacation);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteVacation(int id)
        {
            Vacation vacation = context.Vacations.Find(id);
            if (vacation == null)
                return NotFound();
            context.Vacations.Remove(vacation);
            context.SaveChanges();
            return NoContent();
        }
    }
}
