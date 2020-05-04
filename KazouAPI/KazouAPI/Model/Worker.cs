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
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [EmailAddress]
        public string EmailAddress { get; set; }
        public DateTime BirthDay { get; set; }
        [JsonIgnore]
        public List<Involvement> Involvements { get; set; }
    }
}
