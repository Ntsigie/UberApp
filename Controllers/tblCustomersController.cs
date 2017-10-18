using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using UberApp.Models;

namespace UberApp.Controllers
{
    public class tblCustomersController : ApiController
    {
        private MyAppDataEntities db = new MyAppDataEntities();

        // GET: api/tblCustomers
        public IQueryable<tblCustomer> GettblCustomers()
        {
            return db.tblCustomers;
        }

        // GET: api/tblCustomers/5
        public IHttpActionResult GettblCustomer(string Email, string Password)
        {
            var cust = db.tblCustomers.Where(tblCustomer => tblCustomer.Email.Equals(Email) && tblCustomer.Password.Equals(Password)).FirstOrDefault();
            if (cust.Email == null && cust.Password == null)
            {
                return (null);
            }
            else
            {
                return Ok(cust);
            }
        }


        // PUT: api/tblCustomers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblCustomer(int id, tblCustomer tblCustomer)
        {

            Console.WriteLine("Hello");
            tblCustomer oldDetails = tblCustomer;


            if (!ModelState.IsValid)
            {
                return BadRequest("Not valid data");
            }


            using (db)
            {
                var cust = db.tblCustomers.Where(g => g.CustId.Equals(id)).FirstOrDefault();
                if (cust != null)
                {
                    cust.Firstname = tblCustomer.Firstname;
                    cust.Lastname = tblCustomer.Lastname;
                    cust.CustomerAddress= tblCustomer.CustomerAddress;
                    cust.Email = tblCustomer.Email;
                    cust.Password = tblCustomer.Password;

                    var res = db.SaveChanges();

                }
                else
                {
                    return NotFound();
                }
            }
            return Ok();
        }

        // POST: api/tblCustomers
        [ResponseType(typeof(tblCustomer))]
        public IHttpActionResult PosttblCustomer(tblCustomer tblCustomer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tblCustomers.Add(tblCustomer);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tblCustomer.CustId }, tblCustomer);
        }

        // DELETE: api/tblCustomers/5
        [ResponseType(typeof(tblCustomer))]
        public IHttpActionResult DeletetblCustomer(int id)
        {
            tblCustomer tblCustomer = db.tblCustomers.Find(id);
            if (tblCustomer == null)
            {
                return NotFound();
            }

            db.tblCustomers.Remove(tblCustomer);
            db.SaveChanges();

            return Ok(tblCustomer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblCustomerExists(int id)
        {
            return db.tblCustomers.Count(e => e.CustId == id) > 0;
        }
    }
}