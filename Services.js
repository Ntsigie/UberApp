/// <reference path="C:\Users\User\Desktop\UberApp\UberApp\Scripts/angular.js" />


var UserService = angular.module('UserService', []);

UserService.factory('UserApi', function ($http) {
    var urlBase = "http://localhost:59216/api/";
    var UserApi = {};


    

    //  Get all users
    UserApi.getCustomers = function () {   
        return $http.get(urlBase + '/tblCustomers');
    }

    //  RegisterUser
    UserApi.AddUser = function (user) { //
        return $http.post(urlBase + '/tblCustomers', user); 
    }

    //  LoginUser
    UserApi.GetUserInfo = function (Email, Password) {  
        return $http.get(urlBase + 'tblCustomers?Email=' + Email + '&Password=' + Password);
    }

    //update customer details
    UserApi.EditCustomer = function (custToEdit) {
        var datta = $http({
            method: 'PUT',
            url: urlBase + 'tblCustomers/' + custToEdit.CustId,
            data: custToEdit

        });
        return datta;
    }

    //Admin log in

    UserApi.GetAdminInfo = function (UserName,Password) {
        return $http.get(urlBase + 'Admin?UserName=' + UserName + Password);
    }

   
    //*********Add Product******
    //get products
    UserApi.getProduct=function() {
        return $http.get(urlBase + '/Products');
    }

    //Add product

    UserApi.AddProduct=function(product) {
        return $http.post(urlBase + '/Products', product);
    }


    //********Add Restaurants********
    //get restaurants for search
    UserApi.getRestuarant = function () {
        return $http.get(urlBase + '/GetRest');
        }

    //enable this one for admin getting all restaurants

    //get restaurants
  // UserApi.getRestuarant = function () {
    // return $http.get(urlBase + '/Restaurants');
    //}

 
   
    //Add
    UserApi.AddRestaurant = function (ResToAdd) {
        return $http.post(urlBase + '/Restaurants', ResToAdd);
    }

    //Get Prod
    UserApi.getProdInfo = function () {
        return $http.get(urlBase + '/Products');
    };

    //GetCustomers
    UserApi.getCustomers = function () {
        return $http.get(urlBase + '/tblCustomers');
    }

   
   
    //Add payment  details
    UserApi.getPayment = function () {
        return $http.get(urlBase + '/Customerpayments');
    }

    UserApi.AddPayments = function (PaymentsToAdd) {
        return $http.post(urlBase + '/Customerpayments', PaymentsToAdd);
    }


    //Add  Orders 
    UserApi.AddOrders = function (Order) {
        return $http.post(urlBase + '/Orders/', Order);
    }

    //Adding getting all the orders
    UserApi.getOrders = function () {
        return $http.get(urlBase + '/Orders')
    }

    //Add a Driver
    UserApi.AddDriver = function (driver) {
        return $http.post(urlBase + '/Drivers', driver);
    }

    //Driver Login
    UserApi.GetdriverInfo = function (EmailAddress, Password) {
        return $http.get(urlBase + 'Drivers?EmailAddress=' + EmailAddress + '&Password=' + Password);
    }

   

    //Update the Order Status 

    UserApi.updateStatus = function (OrderToEdit) {
        var dattta = $http({
            method: 'PUT',
            url: urlBase + 'Orders/' + OrderToEdit.OrdId,
            data: OrderToEdit,

        });
        return dattta;
    };

     //Driver Viewing orders 
    UserApi.RetrieverOrder = function () {
        return $http.get(urlBase + 'Orders');
    }
   
    //For the delivery status
    UserApi.getOrderz = function () {
        return $http.get(urlBase + 'GetDriverOrders');
    }

    //For the order status
    UserApi.getOrderzs = function () {
        return $http.get(urlBase + 'GetDriverOrders');
    }


    return UserApi;
   
});





