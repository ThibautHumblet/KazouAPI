using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace KazouAPI.Model
{
    public class Worker
    {
        [Key]
        public int WorkerID { get; set; }
        [Required]
        [StringLength(100)]
        [RegularExpression(@"^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$")]
        public string FirstName { get; set; }
        [Required]
        [StringLength(100)]
        [RegularExpression(@"^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$")]
        public string LastName { get; set; }
        [EmailAddress]
        public string EmailAddress { get; set; }
        [DataType(DataType.Date)]
        public DateTime BirthDay { get; set; }
        [JsonIgnore]
        public List<Involvement> Involvements { get; set; }
    }
}
