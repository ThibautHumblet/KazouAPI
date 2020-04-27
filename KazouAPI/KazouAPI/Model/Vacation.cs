using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KazouAPI.Model
{
    public class Vacation
    {
        public int VacationID { get; set; }
        public string Name { get; set; }
        public int DestinationID { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int VVID { get; set; }

    }
}
