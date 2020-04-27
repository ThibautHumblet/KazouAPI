using KazouAPI.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KazouAPI
{
    public class KazouContext: DbContext
    {
        public KazouContext (DbContextOptions<KazouContext> options): base(options)
        {

        }

        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Involvement> Involvements { get; set; }
        public DbSet<Moni> Monis { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Vacation> Vacations { get; set; }
    }
}
