using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MomgoSample.Model
{
    public class Restaurant
    {
        public ObjectId Id { get; set; }
        public Address address { get; set; }
        public string borough { get; set; }
        public string cuisine { get; set; }
        public IList<Grade> grades { get; set; }
        public string name { get; set; }
        public string restaurant_id { get; set; }
        public int ts { get; set; }
    }
}
