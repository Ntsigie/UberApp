using System;
using System.Data.SqlClient;

namespace UberApp.Models
{
    public class DataAccess
    {
        public long User(long CustId, string Firstname)
        {

            using (SqlConnection connect = new SqlConnection("dbUberEatsEntities1"))
            {
                using (SqlCommand comma = new SqlCommand())
                {
                    comma.Connection = connect;
                    try
                    {
                        comma.Connection.Open();
                        comma.CommandText = "INSERT INTO [dbo].[tblCustomer](Firstname,Lastname,Email,Password) VALUES(@Firstname,@Lastname,@Email,@Password)";
                        //comma.Parameters.AddWithValue("@Firstname", Firstname);
                        //comma.Parameters.AddWithValue("@Lastname", Lastname);
                        //comma.Parameters.AddWithValue("@Contact", Contact);
                        //comma.Parameters.AddWithValue("@Email", Email);
                        //comma.Parameters.AddWithValue("@Password", Password);
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
            return CustId;
        }

        internal long User(LogIn custId)
        {
            throw new NotImplementedException();
        }

        internal int User(tblCustomer value)
        {
            throw new NotImplementedException();
        }


        public LogIn getUser(string Email, string Password)
        {
            LogIn use = null;
            string query = "SELECT Email,Password WHERE Email=@Email AND Password=@Password";


            using (SqlConnection connect = new SqlConnection("DatabaseEntities1"))
            {
                using (SqlCommand comma = new SqlCommand(query, connect))
                    try
                    {
                        connect.Open();
                        comma.CommandText = "INSERT INTO [dbo].[tblCustomer](Email,Password) VALUES(@Email,@Password)";
                        comma.Parameters.AddWithValue("@Email", Email);
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