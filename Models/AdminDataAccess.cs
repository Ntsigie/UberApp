using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


namespace UberApp.Models
{
    public class AdminDataAccess
    {
        public long User(long id)
        {

            using (SqlConnection connect = new SqlConnection("MyAppDataEntities"))
            {
                using (SqlCommand comma = new SqlCommand())
                {
                    comma.Connection = connect;
                    try
                    {
                        comma.Connection.Open();
                        comma.CommandText = "INSERT INTO [dbo].[Admin](UserName,Password) VALUES(@AUserName,@Password)";
                        //comma.Parameters.AddWithValue("@Firstname", firstname);
                        //comma.Parameters.AddWithValue("@lastname", lastname);
                        //comma.Parameters.AddWithValue("@email", email);
                        //comma.Parameters.AddWithValue("@password", password);
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

        internal long User(LogIn id)
        {
            throw new NotImplementedException();
        }

        internal int User(Admin value)
        {
            throw new NotImplementedException();
        }


        public LogIn getUser(string UserName, string Password)
        {
            LogIn use = null;
            string query = "SELECT UserName,Password WHERE UserName=@UserName AND Password=@Password";


            using (SqlConnection connect = new SqlConnection("MyAppDataEntities"))
            {
                using (SqlCommand comma = new SqlCommand(query, connect))
                    try
                    {
                        connect.Open();
                        comma.CommandText = "INSERT INTO [dbo].[Admin]Username,Password) VALUES(@UserName,@Password)";
                        comma.Parameters.AddWithValue("@Username", UserName);
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
