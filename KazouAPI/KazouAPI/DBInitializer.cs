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
            context.Database.EnsureCreated();

            if (!context.Monis.Any())
            {
                var moni = new Moni()
                {
                    FirstName = "Thibaut",
                    LastName = "Humblet",
                    BirthDay = DateTime.Now
                };

                context.Monis.Add(moni);
                context.SaveChanges();
            }
        }
    }
}
