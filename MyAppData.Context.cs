﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace UberApp
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class MyAppDataEntities : DbContext
    {
        public MyAppDataEntities()
            : base("name=MyAppDataEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Restaurant> Restaurants { get; set; }
        public virtual DbSet<Pics> Pics1 { get; set; }
        public virtual DbSet<Customerpayment> Customerpayments { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<ResImage> ResImages { get; set; }
        public virtual DbSet<Driver> Drivers { get; set; }
        public virtual DbSet<tblCustomer> tblCustomers { get; set; }
    
        public virtual ObjectResult<Getprodpic_Result> Getprodpic()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Getprodpic_Result>("Getprodpic");
        }
    
        public virtual ObjectResult<Procedure1_Result> Procedure1()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Procedure1_Result>("Procedure1");
        }
    
        public virtual ObjectResult<Getprodpic1_Result> Getprodpic1()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Getprodpic1_Result>("Getprodpic1");
        }
    
        public virtual ObjectResult<Procedurepic_Result> Procedurepic()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Procedurepic_Result>("Procedurepic");
        }
    
        public virtual ObjectResult<GetOrders_Result> GetOrders()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetOrders_Result>("GetOrders");
        }
    
        public virtual ObjectResult<ProcedureResimage_Result> ProcedureResimage()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<ProcedureResimage_Result>("ProcedureResimage");
        }
    
        public virtual ObjectResult<RestData_Result> RestData()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<RestData_Result>("RestData");
        }
    
        public virtual ObjectResult<DriversGetsOrders_Result> DriversGetsOrders()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<DriversGetsOrders_Result>("DriversGetsOrders");
        }
    
        public virtual ObjectResult<DriversGetsOrders1_Result> DriversGetsOrders1()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<DriversGetsOrders1_Result>("DriversGetsOrders1");
        }
    }
}
