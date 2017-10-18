using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UberApp.Controllers
{
    public class ProductDetail
    {
        public int ProId { get; set; }
        public string Productname { get; set; }
        public string ProductDescription { get; set; }
        public string ProductType { get; set; }
        public double Price { get; set; }

        public byte[] Image { get; set; }
        public ProductDetail() { }
    }
}