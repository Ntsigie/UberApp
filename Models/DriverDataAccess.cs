using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data.Sql;

namespace UberApp.Models
{
    public class DriverDataAccess
    {
        public long User(long id, string firstName)
        {

            using (SqlConnection connect = new SqlConnection("MyAppDataEntities"))
            {
                using (SqlCommand comma = new SqlCommand())
                {
                    comma.Connection = connect;
                    try
                    {
                        comma.Connection.Open();
                        comma.CommandText = "INSERT INTO [dbo].[Driver](Firstname ,EmailAddress,Password) VALUES(@Firstname,@EmailAddress,@Password)";
                        comma.ExecuteNonQuery();
                    }
                    catch (SqlException)
                    {
                        throw;
                    }
                    finally
                    {
                        comma.Connection.Close();
                    }
                }
            }
            return id;
        }

        internal long User(DriverLogin id)
        {
            throw new NotImplementedException();
        }

        internal int User(Driver value)
        {
            throw new NotImplementedException();
        }


        public DriverLogin getUser(string EmailAddress, string Password)
        {
            DriverLogin use = null;
            string query = "SELECT EmailAddress,Password WHERE EmailAddress=@EmailAddress AND Password=@Password";


            using (SqlConnection connect = new SqlConnection("MyAppDataEntities"))
            {
                using (SqlCommand comma = new SqlCommand(query, connect))
                    try
                    {
                        connect.Open();
                        comma.CommandText = "INSERT INTO [dbo].[Driver](EmailAddress,Password) VALUES(@EmailAddress,@Password)";
                        comma.Parameters.AddWithValue("@EmailAddress", EmailAddress);
                        comma.Parameters.AddWithValue("@Password", Password);
                        comma.ExecuteNonQuery();
                    }
                    catch
                    {
                        connect.Close();
                    }

            }

            return use;

        }
    }
}

  