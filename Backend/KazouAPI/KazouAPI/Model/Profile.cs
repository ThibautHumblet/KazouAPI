using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace KazouAPI.Model
{
    public class Profile
    {
        [Key]
        public int ProfileID { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public List<Involvement> Involvements { get; set; }
    }
}
