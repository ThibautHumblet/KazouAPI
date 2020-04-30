using KazouAPI.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KazouAPI
{
    public class KazouContext : DbContext
    {
        public KazouContext(DbContextOptions<KazouContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Involvement>()
            //    .HasOne(pt => pt.Worker)
            //    .WithMany(p => p.Involvements)
            //    .HasForeignKey(pt => pt.WorkerID);

            //modelBuilder.Entity<Involvement>()
            //    .HasOne(pt => pt.Vacation)
            //    .WithMany(t => t.Involvements)
            //    .HasForeignKey(pt => pt.VacationID);

            //modelBuilder.Entity<Involvement>()
            //    .HasOne(pt => pt.Profile)
            //    .WithMany(t => t.Involvements)
            //    .HasForeignKey(pt => pt.ProfileID);
        }

        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Involvement> Involvements { get; set; }
        public DbSet<Worker> Workers { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Vacation> Vacations { get; set; }
    }
}
