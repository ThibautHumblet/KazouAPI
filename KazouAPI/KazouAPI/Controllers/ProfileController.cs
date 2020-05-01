using KazouAPI.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KazouAPI.Controllers
{
    [Route("api/v1/profiles")]
    public class ProfileController : Controller
    {
        private readonly KazouContext context;
        public ProfileController(KazouContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public List<Profile> GetAllProfiles()
        {
            return context.Profiles.ToList();
        }

        [Route("{id}")]
        [HttpGet]
        public IActionResult GetProfile(int id)
        {
            Profile profile = context.Profiles.Find(id);
            if (profile == null)
                return NotFound();
            return Ok(profile);
        }

        [HttpPost]
        public IActionResult CreateProfile([FromBody] Profile newProfile)
        {
            context.Profiles.Add(newProfile);
            context.SaveChanges();
            return Created("", newProfile);
        }

        [HttpPut]
        public IActionResult UpdateProfile([FromBody] Profile updateProfile)
        {
            Profile originalProfile = context.Profiles.Find(updateProfile.ProfileID);
            if (originalProfile == null)
                return NotFound();

            originalProfile.Name = updateProfile.Name;
            originalProfile.Description = updateProfile.Description;
            context.SaveChanges();
            return Ok(originalProfile);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteProfile(int id)
        {
            Profile profile = context.Profiles.Find(id);
            if (profile == null)
                return NotFound();
            context.Profiles.Remove(profile);
            context.SaveChanges();
            return NoContent();
        }
    }
}
