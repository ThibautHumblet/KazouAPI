using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace KazouAPI.Model
{
    public class Vacation
    {
        [Key]
        public int VacationID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int DestinationID { get; set; }
        public Destination Destination { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [JsonIgnore]
        public List<Involvement> Involvements { get; set; }

    }
}
