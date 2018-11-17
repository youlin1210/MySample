using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MomgoSample.Model
{
    public class Address
    {
        
        public string street { get; set; }
        public string zipcode{ get; set; }
        public string building{ get; set; }
        public IList<double> coord { get; set; }
    }



    public class AddressProjection
    {
        public ObjectId Id { get; set; }
        public Address address { get; set; }
    }
}
