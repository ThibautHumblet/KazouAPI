using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace KazouAPI.Model
{
    public class Involvement // voor de many-to-many relations
    {
        [Key]
        public int InvolvementID { get; set; }
        [Required]
        public int VacationID { get; set; }
        public Vacation Vacation { get; set; }
        [Required]
        public int WorkerID { get; set; }
        public Worker Worker { get; set; }
        [Required]
        public int ProfileID { get; set; }
        public Profile Profile { get; set; }
    }
}
