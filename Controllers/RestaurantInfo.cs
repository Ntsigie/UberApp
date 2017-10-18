using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UberApp.Controllers
{
    public class RestaurantInfo
    {
        public string Resname { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public byte[] Image { get; set; }

        public RestaurantInfo() { }
    }
}