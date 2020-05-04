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
            return context.Involvements.Include(i => i.Vacation).ThenInclude(i => i.Destination).Include(i => i.Worker).Include(i => i.Profile).ToList();
        }

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetInvolvement(int id)
        {
            Involvement involvement = context.Involvements.Include( d => d.Vacation).Include(d => d.Worker).Include(d => d.Profile).SingleOrDefault(d => d.InvolvementID == id);
            if (involvement == null)
                return NotFound();
            return Ok(involvement);
        }

        [HttpPost]
        public IActionResult CreateInvolvement([FromBody] Involvement newInvolvement)
        {
            context.Involvements.Add(newInvolvement);
            context.SaveChanges();
            return Created("", newInvolvement);
        }

        [HttpPut]
        public IActionResult UpdateInvolvement([FromBody] Involvement updateInvolvement)
        {
            Involvement originalInvolvement = context.Involvements.Find(updateInvolvement.InvolvementID);
            if (originalInvolvement == null)
                return NotFound();

            originalInvolvement.VacationID = updateInvolvement.VacationID;
            originalInvolvement.WorkerID = updateInvolvement.WorkerID;
            originalInvolvement.ProfileID = updateInvolvement.ProfileID;
            context.SaveChanges();
            return Ok(originalInvolvement);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteInvolvement(int id)
        {
            Involvement involvement = context.Involvements.Find(id);
            if (involvement == null)
                return NotFound();
            context.Involvements.Remove(involvement);
            context.SaveChanges();
            return NoContent();
        }
    }
}
