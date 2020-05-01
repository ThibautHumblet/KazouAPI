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

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetDestination(int id)
        {
            Destination destination = context.Destinations.Find(id);
            if (destination == null)
                return NotFound();
            return Ok(destination);
        }

        [HttpPost]
        public IActionResult CreateDestination([FromBody] Destination newDestination)
        {
            context.Destinations.Add(newDestination);
            context.SaveChanges();
            return Created("", newDestination);
        }

        [HttpPut]
        public IActionResult UpdateDestination([FromBody] Destination updateDestination)
        {
            Destination originalDestination = context.Destinations.Find(updateDestination.DestinationID);
            if (originalDestination == null)
                return NotFound();

            originalDestination.Name = updateDestination.Name;
            originalDestination.Country = updateDestination.Country;
            originalDestination.Region = updateDestination.Region;
            context.SaveChanges();
            return Ok(originalDestination);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteDestination(int id)
        {
            Destination destination = context.Destinations.Find(id);
            if (destination == null)
                return NotFound();
            context.Destinations.Remove(destination);
            context.SaveChanges();
            return NoContent();
        }
    }
}
