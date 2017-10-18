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
using UberApp;

namespace UberApp.Controllers
{
    public class CustomerpaymentsController : ApiController
    {
        private MyAppDataEntities db = new MyAppDataEntities();

        // GET: api/Customerpayments
        public IQueryable<Customerpayment> GetCustomerpayments()
        {
            return db.Customerpayments;
        }

        // GET: api/Customerpayments/5
        [ResponseType(typeof(Customerpayment))]
        public IHttpActionResult GetCustomerpayment(int id)
        {
            Customerpayment customerpayment = db.Customerpayments.Find(id);
            if (customerpayment == null)
            {
                return NotFound();
            }

            return Ok(customerpayment);
        }

        // PUT: api/Customerpayments/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCustomerpayment(int id, Customerpayment customerpayment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customerpayment.PayId)
            {
                return BadRequest();
            }

            db.Entry(customerpayment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerpaymentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Customerpayments
        [ResponseType(typeof(Customerpayment))]
        public IHttpActionResult PostCustomerpayment(Customerpayment customerpayment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Customerpayments.Add(customerpayment);

            try
            {
                db.SaveChanges();
            }
           catch(DbUpdateException)
            {
                if (CustomerpaymentExists(customerpayment.PayId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
                   
            }

            return CreatedAtRoute("DefaultApi", new { id = customerpayment.PayId }, customerpayment);
        }

        // DELETE: api/Customerpayments/5
        [ResponseType(typeof(Customerpayment))]
        public IHttpActionResult DeleteCustomerpayment(int id)
        {
            Customerpayment customerpayment = db.Customerpayments.Find(id);
            if (customerpayment == null)
            {
                return NotFound();
            }

            db.Customerpayments.Remove(customerpayment);
            db.SaveChanges();

            return Ok(customerpayment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerpaymentExists(int id)
        {
            return db.Customerpayments.Count(e => e.PayId == id) > 0;
        }
    }
}