using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using UberApp;

namespace UberApp.Controllers
{
    public class PicsController : ApiController
    {
        private MyAppDataEntities db = new MyAppDataEntities();

        // GET: api/Pics
        public IQueryable<Pics> GetPics1()
        {
            return db.Pics1;
        }

        // GET: api/Pics/5
        [ResponseType(typeof(Pics))]
        public IHttpActionResult GetPics(int id)
        {
            Pics pics = db.Pics1.Find(id);
            if (pics == null)
            {
                return NotFound();
            }

            return Ok(pics);
        }

        public String POST()
        {
            int counts = 0;

            System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
            string url = HttpContext.Current.Request.Url.AbsoluteUri;
            Pics prodimage = new Pics();

            String Status = "";
            for (int m = 0; m < files.Count; m++)
            {
                //get files(product pictures)
                System.Web.HttpPostedFile file = files[m];
                string filename = new FileInfo(file.FileName).Name;

                if (file.ContentLength > 0)
                {
                    Guid id = Guid.NewGuid();
                    string modifiedFileName = id.ToString() + "_" + filename;
                    byte[] imageprod = new byte[file.ContentLength];
                    file.InputStream.Read(imageprod, 0, file.ContentLength);

                    prodimage.Image = imageprod;
                    db.Pics1.Add(prodimage);
                    db.SaveChanges();
                    counts++;

                }
            }
            if (counts > 0)
            {
                return Status;
            }
            return "Upload was unsuccesful";
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PicsExists(int id)
        {
            return db.Pics1.Count(e => e.ID == id) > 0;
        }
    }
}