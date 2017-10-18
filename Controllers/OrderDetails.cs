using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UberApp.Controllers
{
    public class OrderDetails
    {
        public int OrdId { get; set; }
        public int CustId { get; set; }
        public string totalPrice { get; set; }
        public string CustomerAddress { get; set; }
        public string OrderStatus { get; set; }
        public string DeliveryStatus { get; set; }

        public OrderDetails() { }
    }
}