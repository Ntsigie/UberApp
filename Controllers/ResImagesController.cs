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
    public class ResImagesController : ApiController
    {
        private MyAppDataEntities db = new MyAppDataEntities();

        // GET: api/ResImages
        public IQueryable<ResImage> GetResImages()
        {
            return db.ResImages;
        }

        // GET: api/ResImages/5
        [ResponseType(typeof(ResImage))]
        public IHttpActionResult GetResImage(int id)
        {
            ResImage resImage = db.ResImages.Find(id);
            if (resImage == null)
            {
                return NotFound();
            }

            return Ok(resImage);
        }

        /* This is used for file accessing and post a file to a database using a server */
        public String POST()
        {
            int counter = 0;

            // collecting files
            System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
            string url = HttpContext.Current.Request.Url.AbsoluteUri;
            ResImage respic = new ResImage();

            String Status = "";
            for (int i = 0; i < files.Count; i++)
            {
                //get the posted files
                System.Web.HttpPostedFile file = files[i];

                string fileName = new FileInfo(file.FileName).Name;

                if (file.ContentLength > 0)
                {
                    Guid id = Guid.NewGuid();

                    string modifiedFileName = id.ToString() + "_" + fileName;

                    byte[] imageb = new byte[file.ContentLength];
                    file.InputStream.Read(imageb, 0, file.ContentLength);

                    respic.Image = imageb;
                    db.ResImages.Add(respic);
                    db.SaveChanges();
                    counter++;
                }

            }

            if (counter > 0)
            {
                return Status;
            }
            return "Upload Failed";
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ResImageExists(int id)
        {
            return db.ResImages.Count(e => e.Id == id) > 0;
        }
    }
}