using KazouAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KazouAPI
{
    public class DBInitializer
    {
        public static void Initialize(KazouContext context)
        {
            Worker worker = null;
            Vacation vacation = null;
            Profile profile = null;
            Destination destination = null;

            context.Database.EnsureCreated();

            if (!context.Workers.Any())
            {
                worker = new Worker()
                {
                    FirstName = "Thibaut",
                    LastName = "Humblet",
                    EmailAddress = "thibaut.humblet@student.ap.be",
                    BirthDay = DateTime.Now
                };

                context.Workers.Add(worker);
                context.SaveChanges();
            }

            if (!context.Destinations.Any())
            {
                destination = new Destination()
                {
                    Name = "Massembre",
                    Country = "België",
                    Region = "Ardennen"
                };

                context.Destinations.Add(destination);
                context.SaveChanges();
            }

            if (!context.Profiles.Any())
            {
                profile = new Profile()
                {
                    Name = "Moni",
                    Description = "De animator of moni zorgt ervoor dat de kinderen een onvergetelijke vakantie hebben"
                };

                context.Profiles.Add(profile);
                context.SaveChanges();
            }

            if (!context.Vacations.Any())
            {
                vacation = new Vacation()
                {
                    Name = "Crazy Adventure",
                    Destination = destination,
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(7)
                };

                context.Vacations.Add(vacation);
                context.SaveChanges();
            }

            if (!context.Involvements.Any())
            {
                var involvement = new Involvement()
                {
                    Vacation = vacation,
                    Worker = worker,
                    Profile = profile
                };

                context.Involvements.Add(involvement);
                context.SaveChanges();
            }
        }
    }
}
