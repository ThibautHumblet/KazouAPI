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
    [ApiController]
    public class VacationController : ControllerBase
    {
        private readonly KazouContext context;
        public VacationController(KazouContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public List<Vacation> GetAllVacations(string name, string startDate, string destinationID, string sort, int? page, int pageLength = 5, string dir = "asc")
        {
            IQueryable<Vacation> query = context.Vacations;

            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(d => d.Name == name);
            if (!string.IsNullOrWhiteSpace(startDate))
                query = query.Where(d => d.StartDate == DateTime.Parse(startDate));
            if (!string.IsNullOrWhiteSpace(destinationID))
                query = query.Where(d => d.DestinationID == int.Parse(destinationID));
                

            if (page.HasValue)
                query = query.Skip(page.Value * pageLength);
            query = query.Take(pageLength);

            if (!string.IsNullOrWhiteSpace(sort))
            {
                switch (sort)
                {
                    case "name":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Name);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Name);
                        break;
                    case "startdate":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.StartDate);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.StartDate);
                        break;
                }
            }

            return query.Include(i => i.Destination).ToList();
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
            if (!ModelState.IsValid) 
                return BadRequest();
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
