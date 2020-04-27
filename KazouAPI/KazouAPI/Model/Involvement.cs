using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KazouAPI.Model
{
    public class Involvement // voor de many-to-many relations
    {
        public int VacationID { get; set; }
        public int MoniID { get; set; }
        public int ProfileID { get; set; }
    }
}
