﻿using System;
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
    public class DriversController : ApiController
    {
        private MyAppDataEntities db = new MyAppDataEntities();

        // GET: api/Drivers
        public IQueryable<Driver> GetDrivers()
        {
            return db.Drivers;
        }


        //// GET: api/Drivers/5
        //[ResponseType(typeof(Driver))]
        //public IHttpActionResult GetDriver(string EmailAddress, string Password)
        //{
        //    var driver = db.Drivers.Where(Driver => Driver.EmailAddress.Equals(EmailAddress) && Driver.Password.Equals(Password)).FirstOrDefault();
        //    if (driver.EmailAddress == null && driver.Password == null)
        //    {
        //        return (null);
        //    }
        //    else
        //    {
        //        return Ok(driver);
        //    }
        //}

       
        // PUT: api/Drivers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDriver(int id, Driver driver)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != driver.DriverId)
            {
                return BadRequest();
            }

            db.Entry(driver).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DriverExists(id))
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

        // POST: api/Drivers
        [ResponseType(typeof(Driver))]
        public IHttpActionResult PostDriver(Driver driver)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Drivers.Add(driver);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (DriverExists(driver.DriverId))
                {
                    return Conflict();
                }
                else
                    {
                    throw;
                    }
            }

            
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = driver.DriverId }, driver);
        }

        // DELETE: api/Drivers/5
        [ResponseType(typeof(Driver))]
        public IHttpActionResult DeleteDriver(int id)
        {
            Driver driver = db.Drivers.Find(id);
            if (driver == null)
            {
                return NotFound();
            }

            db.Drivers.Remove(driver);
            db.SaveChanges();

            return Ok(driver);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DriverExists(int id)
        {
            return db.Drivers.Count(e => e.DriverId == id) > 0;
        }
    }
}