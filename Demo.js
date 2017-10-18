/// <reference path="C:\Users\User\Desktop\UberApp\UberApp\Scripts/angular.js" />


var SignIn = angular.module("SignIn", ['ngRoute', 'UserService']);

SignIn.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'HTML/Home.html'
        }).
        when('/Add', {
            templateUrl: 'HTML/CreateAccount.html',
            controller: 'UserController'
        }).
        when('/Login', {
            templateUrl: 'HTML/Login.html',
            controller: 'LoginController'
        }).
        when('/Admin', {
            templateUrl: 'HTML/Admin.html',
            controller: 'AdminController'
        }).
        when('/AdminDashBoard', {
            templateUrl: 'HTML/AdminDashBoard.html',

        }).
        when('/AddRestaurant', {
            templateUrl: 'HTML/AddRestaurantView.html',
            controller: 'AddRestaurantController'
        }).
        when('/AddProduct', {
            templateUrl: 'HTML/Product.html',
            controller: 'AddProductController'
        }).
         when('/UploadProductImage', {
             templateUrl: 'HTML/UploadProductImage.html',
             controller: 'ImageController'
         }).

        when('/Search', {
            templateUrl: 'HTML/Search.html',
            controller: 'SearchRestuarantController'
        }).
        when('/Profile', {
            templateUrl: 'HTML/Profile.html',
            controller: 'EditCustomerController'
        }).
        when('/ViewProduct', {
            templateUrl: 'HTML/ViewProduct.html',
            controller: 'ViewProductController'
        }).
         when('/ViewCustomers', {
             templateUrl: 'HTML/ViewCustomers.html',
             controller: 'ViewCustomersController'
         }).
         when('/ViewRestaurants', {
             templateUrl: 'HTML/ViewRestaurants.html',
             controller: 'ViewRestaurantsController'
         }).
         when('/ViewOrder', {
             templateUrl: 'HTML/ViewOrder.html',
             controller: 'ViewOrdersController'
         }).
         when('/Viewpayment', {
             templateUrl: 'HTML/Viewpayment.html',
             controller: 'ViewpaymentController'
         }).
        when('/ShoppingCart', {
            templateUrl: 'HTML/ShoppingCart.html',
            controller: 'ShoppingCartController'
        }).
        when('/ViewCart',
            {
                templateUrl: 'HTML/ViewCart.html',
                controller: 'ViewCartController'
            }).
         when('/CustomerPayment',
            {
                templateUrl: 'HTML/CustomerPayment.html',
                controller: 'CustomerPaymentController'
            }).
         when('/Order',
            {
                templateUrl: 'HTML/Order.html',
                controller: 'OrderController'
            }).
         when('/UploadRestaurantImage', {
             templateUrl: 'HTML/UploadRestaurantImage.html',
             controller: 'UploadRestaurantImageController'
         }).
        when('/Driver', {
            templateUrl: 'HTML/Driver.html',
            controller: 'DriverController'
        }).
         when('/DriverSigIn', {
             templateUrl: 'HTML/DriverSigIn.html',
             controller: 'DriverLoginController'
         }).
         when('/DriverDashboard', {
             templateUrl: 'HTML/DriverDashboard.html',

         }).
         when('/DriverSigIn', {
             templateUrl: 'HTML/DriverSigIn.html',
             controller: 'DriverLoginController'
         }).
         when('/DriverViewOrders', {
             templateUrl: 'HTML/DriverViewOrders.html',
             controller: 'DriverViewOrdersController'
         }).
        when('/UpdateOrderStatus', {
            templateUrl: 'HTML/UpdateOrderStatus.html',
            controller: 'UpdateOrderStatusController'
        }).
               otherwise({
            redirectTo: '/Home'
        });
}]).constant('FIREBASE_URL', 'something');



//Customer Registering on the system
SignIn.controller("UserController", function ($scope, UserApi , $location) {
   
    $scope.AdUser = function () {
       
        var UserToAdd = {
            'Firstname': $scope.Firstname,
            'Lastname': $scope.Lastname,
            'CustomerAddress': $scope.CustomerAddress,
            'Email': $scope.Email,
            'Password': $scope.Password
        };

        UserApi.AddUser(UserToAdd).then(function (reponse) {
                alert("You are successfully registered");
                $scope.Firstname = undefined;
                $scope.Lastname = undefined;
                $scope.CustomerAddress = undefined;
                $scope.Email = undefined;
                $scope.Password = undefined;
                $location.path('/Home');
            }),
            function (response) {
                alert("Unable to add user");
            }
    }
});

//Customer Logging In
SignIn.controller("LoginController", function ($scope, $http, UserApi, $rootScope, $location, $window) {
    
    $scope.LogInUser = {
        'Email': $scope.Email,
        'Password': $scope.Password,
        'Firstname': $scope.Firstname
    }

    $scope.LoginForm = function () {
        UserApi.GetUserInfo($scope.Email, $scope.Password).then(function (response) {
            if (response.data === null) {
                alert("You've entered an ivalid email and password");
            } else {
                alert("Login Successful. Welcome " + response.data.Firstname);
                $rootScope.currentUser = response.data;
                $location.path('/ShoppingCart');
            }
        }), function (response) {
            alert("Error in logging in the system");
        }
    };
});

//Admin Logging In
SignIn.controller("AdminController",function ($scope, $http, UserApi, $rootScope, $location, $window) {
    $scope.LogInAdmin = {
        'UserName': $scope.UserName,
        'Password': $scope.Password
    }

    $scope.AdLog = function() {
        UserApi.GetUserInfo($scope.UserName, $scope.Password).then(function(response) {
            if (response.data === null) {
                alert("You have entered the wrong password and username");
            } else {
                alert("Log in Succesful welcome Admin" + response.data.UserName);
                $rootScope.currentUser = response.data;
                $location.path('/AdminDashBoard');
            }
        }), function() {
            alert("Error logging");
        }
    };


});

//Admin adding product
SignIn.controller("AddProductController", function ($scope, UserApi) {

    $scope.AddPro = function () {
        var productToAdd = {
            'Productname': $scope.Productname,
            'ProductDescription': $scope.ProductDescription,
            'ProductType': $scope.ProductType,
            'Price': $scope.Price
        }


        UserApi.AddProduct(productToAdd).then(function (reponse) {
                alert("Product added successfully");
                $scope.Productname = undefined;
                $scope.ProductDescription = undefined;
                $scope.ProductType = undefined;
                $scope.Price = undefined;               
                $location.path('/ViewProduct');
            }),
            function (response) {
                alert("Unable to add product");
            }
    }
});

//Admin Adding restaurant
SignIn.controller("AddRestaurantController", function ($scope, UserApi) {
    $scope.AddRes = function () {
        var ResToAdd = {
            'City': $scope.City,
            'Address': $scope.Address,
            'Resname': $scope.Resname,
            'EmailAddress': $scope.EmailAddress,
            'PhoneNumber': $scope.PhoneNumber,
            'Type_Of_Cuisine': $scope.Type_Of_Cuisine,
            'Do_You_OfferDelivery': $scope.Do_You_OfferDelivery
           
        }


        UserApi.AddRestaurant(ResToAdd).then(function (reponse) {
            alert("Restaurant added successfully");
            $scope.City = undefined;
            $scope.Address = undefined;
            $scope.Resname = undefined;
            $scope.EmailAddress = undefined;
            $scope.PhoneNumber = undefined;
            $scope.Type_Of_Cuisine = undefined;
            $scope.Do_You_OfferDelivery= undefined;
            $location.path('/ViewRestaurants');
            }),
            function (response) {
                alert("Unable to add Restaurant");
            }
    }
});

//Customer searching for restaurants
SignIn.controller("SearchRestuarantController", function ($scope, $location, UserApi) {

    getRes();
    function getRes() {

        UserApi.getRestuarant().then(function (response) {
            $scope.Restaurant = response.data;
        }), function () {
            alert('No Restaurants Found');
        }
    }

});

//Editing customer details
SignIn.controller("EditCustomerController", function ($scope, UserApi, $location, $rootScope) {
    getCust();
    function getCust() {
        UserApi.getCustomers().then(function (response) {
            $rootScope.tblCustomer = response.data;
        }), function () {
            alert("Couldn't get all the customers information");
        }
    }
    //need to add address
    $scope.CustId = $rootScope.currentUser.CustId;
    $scope.Firstname = $rootScope.currentUser.Firstname;
    $scope.Lastname = $rootScope.currentUser.Lastname;
    $scope.Email = $rootScope.currentUser.Email;
    $scope.Password = $rootScope.currentUser.Password;
   

    $scope.EditCustomer = function () {
        var custToEdit = {
            'CustId': $scope.CustId,
            'Firstname': $scope.Firstname,
            'Lastname': $scope.Lastname,
            'Email': $scope.Email,
            'Password': $scope.Password
            
        };

        UserApi.EditCustomer(custToEdit).then(function (response) {
                alert("Customer Profile updated successfully");
                $scope.CustId= undefined;
                $scope.Firstname= undefined;
                $scope.Lastname= undefined;
                $scope.Email= undefined;
                $scope.Password = undefined;
                getCust();
                $location.path('/Home');
            }),
            function (response) {
                alert("Unable to edit user profile");
            }
    }
});

//  customer views products
SignIn.controller("ViewProductController", function ($scope, UserApi, $location) {

    getProd();
    function getProd() {
        UserApi.getProdInfo().then(function (response) {
            $scope.Product = response.data;
        }), function () {
            alert('No products Found');
        }
    }

});

//Customer managing cart
SignIn.controller("ShoppingCartController", function ($scope,CommonProp, $location, $rootScope,UserApi, $http) {
    //Get products
    getProd();
    function getProd() {
        UserApi.getProduct().then(function (response) {
            $scope.Product = response.data;
        }), function () {
            alert('No products Found');
        }
    }
    // Array for products
    $rootScope.myItems = [];

    // Adding items to cart
    $scope.addItem = function (newItem) {
        if ($rootScope.myItems.length == 0) {
            newItem.count = 1;
            $rootScope.myItems.push(newItem);
           
        } else {
            var repeat = false;
            for (var i = 0; i < $rootScope.myItems.length; i++) {
                if ($rootScope.myItems[i].ProId == newItem.ProId) {
                    $rootScope.myItems[i].count++;
                    repeat = true;
                }
            }
            if (!repeat) {
                newItem.count = 1;
                $rootScope.myItems.push(newItem);
            }
        }
        updatePrice();
        $scope.$watch('myItems', function () {

            CommonProp.setItems($rootScope.myItems);
        });
    };

    // (totalPrice) - update price
    var updatePrice = function () {
        var totalPrice = 0;
        for (var i = 0; i < $rootScope.myItems.length; i++) {
            totalPrice += ($rootScope.myItems[i].count) * ($rootScope.myItems[i].Price);
        }
        $scope.totalPrice = totalPrice;
        CommonProp.setTotal(totalPrice);
    };

    //Clearing the cart
    $scope.removeBasket = function () {
        $rootScope.myItems.splice(0, $rootScope.myItems.length);
        updatePrice();
    };

    //Remove  item from cart
    $scope.removeItem = function (index) {
        $scope.myItems.splice(index, 1);
        updatePrice();
    };


});

//  Customer checking out 
SignIn.service('CommonProp', function () {
    var itemss = '';
    var total = 0.0;    

    return {
        getItems: function () {
            return itemss;
        },
        setItems: function (value) {
            itemss = value;
        },
        getTotal: function () {
            return total;
        },
        setTotal: function (tot) {
            total = tot;
        },
    }
});

//Vieiwing items in the cart
SignIn.controller('ViewCartController', function ($scope, $location, CommonProp, $rootScope, UserApi, $http) {
    $scope.selectedItems = CommonProp.getItems();
    $scope.amountDue = CommonProp.getTotal();
});

//Uploading product image
SignIn.directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {
        var pic = $parse(attrs.ngFiles);

        element.on('pic', function (event) {
            pic(scope, { $files: event.target.files });
        })
    }
    return {
        link:fn_link
    }
}])


SignIn.controller("ImageController",function ($scope,$location,UserApi,$http){
    var  formdata=new FormData();

    $scope.GetImages=function($files){
        $scope.imagesrc=[];


        for(var x=0;x<$files.length;x++){
            var reader=new FileReader();
            reader.Filename=$files[x].name;

            reader.onload=function(event){
                var image={};
                image.Name=event.target.Filename;
                image.Size=(event.total/1024).toFixed(2);
                image.Src=event.target.result;
                $scope.imagesrc.push(image);
                $scope.$apply();
            }
            reader.readAsDataURL($files[x]);
        };
        angular.forEach($files,function (value,key){
            formdata.append(key,value);
        })
        };

    $scope.loadup=function(){
        var quest={
            method:'POST',
            url:'http://localhost:59216/api/Pics',
            data:formdata,
            headers:{
                'Content-Type':undefined
            }
        }
        $http(quest).then(function(bj){
            alert("Picture succefully uploaded"+bj);
            $scope.reset();
        }),function(){
            alert("Upload was unsuccessful");
            $scope.reset();
        }
    }

    $scope.reset=function(){
        angular.forEach(
            angular.element("Input[Type='file']"),
            function(inputElement){
                angular.element(inputElement).val(null);
            }
        );
        $scope.imagesrc=[];
        formdata=new FormData();
    }
})

//Admin viewing all the cutomers in the database
SignIn.controller("ViewCustomersController", function ($scope, UserApi, $location) {
    getCust();
    function getCust() {
        UserApi.getCustomers().then(function (response) {
            $scope.tblCustomer = response.data;
        }), function () {
            alert('No Customers Found');
        }
    }
});

//Admin viewing all the payments in the database
SignIn.controller("ViewpaymentController", function ($scope, UserApi, $location) {
    getpayments();
    function getpayments() {

        UserApi.getPayment().then(function (response) {
            $scope.Customerpayment = response.data;
        }), function () {
            alert('No payments Found');
        }
    }

});

//uploading restaurant image
SignIn.directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {

        var Change = $parse(attrs.ngFiles);

        element.on('change', function (event) {
            Change(scope, { $files: event.target.files });
        })
    }
    return {
        link: fn_link
    }
}])


SignIn.controller("UploadRestaurantImageController", function ($scope, $location, UserApi, $http) {
    var formdata = new FormData();

    $scope.GetImages = function ($files) {
        $scope.imagesrc = [];

        for (var g = 0; g < $files.length; g++) {
            var reader = new FileReader();
            reader.Filename = $files[g].name;

            reader.onload = function (event) {
                var image = {};
                image.Name = event.target.Filename;
                image.Size = (event.total / 1024).toFixed(2);
                image.Src = event.target.result;
                $scope.imagesrc.push(image);
                $scope.$apply();
            }
            reader.readAsDataURL($files[g]);
        };
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        })
    };
    $scope.loadup = function () {
        var reqs = {
            method: 'POST',
            url: 'http://localhost:59216/api/ResImages',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        }

        $http(reqs).then(function (gm) {
            alert("Image saved successfully" + gm);
            $scope.reset();
        }), function () {
            alert("Failed to upload image");
            $scope.reset();
        }
    }

    $scope.reset = function () {
        angular.forEach(
            angular.element("Input [Type = 'file']"),
        function (inElem) {
            angular.element(inElem).val(null);
        }
            );
        $scope.imagesrc = [];
        formdata = new FormData();
    }
})

//Admin viewing restaurants in the databas
SignIn.controller("ViewRestaurantsController", function ($scope, UserApi, $location) {
    getRes();
    function getRes() {

        UserApi.getRestuarant().then(function (response) {
            $scope.Restaurant = response.data;
        }), function () {
            alert('No Restaurants Found');
        }
    }

});

// Customer Placing an order
SignIn.controller("OrderController", function ($scope, $location, $http, $rootScope, UserApi, CommonProp) {
    getOrder();
    function getOrder() {
        UserApi.getOrders().then(function (response) {
            $rootScope.Orders = response.data;
        }), function () {
            alert("Couldn't get all the customers information");
        }
    };

    getProd();
    function getProd() {
        UserApi.getProdInfo().then(function (response) {
            $scope.Product = response.data;
        }), function () {
            alert('No products Found');
        }
    }

    $scope.totalPrice = CommonProp.getTotal();
    $scope.CustId = $rootScope.currentUser.CustId;
    $scope.Firstname = $rootScope.currentUser.Firstname;
    $scope.Email = $rootScope.currentUser.Email;
    $scope.CustomerAddress = $rootScope.currentUser.CustomerAddress;
   

    $scope.AddOrder = function () {
        var OrderAdd = {
            'totalPrice': $scope.totalPrice,
            'Email': $scope.Email,
            'CustId': $scope.CustId,
            'CustomerAddress': $scope.CustomerAddress,
           
        };

        UserApi.AddOrders(OrderAdd).then(function (response) {
            $scope.Order = response.data;
            alert("Your order has beeen succeslly placed");
            $scope.totalPrice = undefined;
            $scope.Email = undefined;
            $scope.CustId = undefined;
            $scope.CustomerAddress = undefined;
            $scope.Firstname = undefined;
            $location.path('/CustomerPayment');

        }),
              function (response) {
              alert("Unable to place order");
         };
    };

                                 
});

//Admin viewing all the orders in the database
SignIn.controller("ViewOrdersController", function ($scope, UserApi, $location, $rootScope) {

    $scope.selectedItem = "Selected Order";
    $scope.isDeleteItemVisible = false;
    getOrder();
    function getOrder() {
        UserApi.getOrders().then(function (response) {
            $scope.Order = response.data;
        }), function () {
            alert("Couldn't get orders");
        }
    };


    $scope.dropboxitemselected = function (item) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = item.OrdId;
        $scope.totalPrice = item.totalPrice;
        $scope.CustomerAddress = item.CustomerAddress;
        $scope.CustId = item.CustId;

    };

    $scope.statsUpdate = function () {

        var statsToEdit = {

            'OrdId': $scope.selectedItem,
            'totalPrice': $scope.totalPrice,
            'CustomerAddress': $scope.CustomerAddress,
            'CustId': $scope.CustId,
            'OrderStatus': $scope.OrderStatus
        };
        UserApi.updateStatus(statsToEdit).then(function (response) {

            alert("Order Status Successfully Updated");
            $scope.totalPrice = undefined;
            $scope.CustomerAddress = undefined;
            $scope.CustId = undefined;
            $scope.OrderStatus = undefined;
            getOrder();
            location.path('/AdminDashboard');
        }),
        function (response) {
            alert("Couldn't update the status");
        }

    };
})


//Customer Payment details
SignIn.controller("CustomerPaymentController", function ($scope, CommonProp, $location, $http, $rootScope, UserApi) {
    $scope.CustId = $rootScope.currentUser.CustId;
    $scope.Firstname = $rootScope.currentUser.Firstname;
    $scope.totalPrice = CommonProp.getTotal();   
    $scope.AdPay = function () {
        var PaymentsToAdd = {
            'BankName': $scope.BankName,
            'Card_Number': $scope.Card_Number,
            'CVV': $scope.CVV,
            'CustId': $scope.CustId
        };

        UserApi.AddPayments(PaymentsToAdd).then(function (reponse) {
            alert($scope.Firstname + " " + "Payment Was Successful" 
                + "Total Price : " + " R" + $scope.totalPrice + " " + "Number of products : " + " " + $rootScope.myItems.length);
            $scope.BankName = undefined;
            $scope.Card_Number = undefined;
            $scope.CVV = undefined;
            $scope.CustId;
            $location.path('/Home');
        }),
            function (response) {
                alert("Payment was unsuccessful");
            };
    };


});

//Driver egistering to the system
SignIn.controller("DriverController", function ($scope, $location, $http, $rootScope, UserApi) {

    $scope.AddDrivers = function () {
        var DriverToAdd = {
            'Firstname': $scope.Firstname,
            'Lastname': $scope.Lastname,
            'EmailAddress': $scope.EmailAddress,
            'Password': $scope.Password,
            'City': $scope.City,
           
        };

        UserApi.AddDriver(DriverToAdd).then(function (reponse) {
            alert("You are successfully added as a Driver on UberEats");
            $scope.Firstname = undefined;
            $scope.Lastname = undefined;
            $scope.EmailAddress = undefined;
            $scope.Password = undefined;
            $scope.City = undefined;            
            $location.path('/Home');
        }),
            function (response) {
                alert("Unable to add you as a driver");
            };
    };


});

//Driver login
SignIn.controller("DriverLoginController", function ($scope, $http, UserApi, $rootScope, $location, $window) {
    $scope.LogInUser = {
        'EmailAddress': $scope.EmailAddress,
        'Password': $scope.Password,
        'Firstname': $scope.Firstname
    }

    $scope.LoginForm = function () {
        UserApi.GetdriverInfo($scope.EmailAddress, $scope.Password).then(function (response) {
            if (response.data === null) {
                alert("You've entered an ivalid email and password");
            } else {
                alert("Login Successful. Welcome " + response.data.Firstname);
                $rootScope.currentUser = response.data;
                $location.path('/DriverViewOrders');
            }
        }), function (response) {
            alert("Error in logging in the system");
        }
    };
});
  
//Driver viewing the orders
SignIn.controller("DriverViewOrdersController", function ($scope, $location, $http, $rootScope, UserApi) {

    $scope.selectedItem = "Selected Order";
    $scope.isDeleteItemVisible = false;
    getOrder();
    function getOrder() {
        UserApi.getOrderz().then(function (response) {
            $scope.drOrds = response.data;
        }), function () {
            alert("Couldn't get all the Orders");
        }
    };


    $scope.dropboxitemselected = function (item) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = item.OrdId;
        $scope.totalPrice = item.totalPrice;
        $scope.CustId = item.CustId;
        $scope.CustomerAddress = item.CustomerAddress;
        $scope.OrderStatus = "Picked Up";
       
    };

   

    $scope.statsUpdate = function () {

        var statsToEdit = {

            'OrdId': $scope.selectedItem,
            'totalPrice': $scope.totalPrice,
            'CustomerAddress': $scope.CustomerAddress,
            'CustId': $scope.CustId,
            'OrderStatus': $scope.OrderStatus,
            'DeliveryStatus': $scope.DeliveryStatus
        };
     
        UserApi.updateStatus(statsToEdit).then(function (response) {
           
            alert("Delivery Status Susccessfully updated");
            $scope.totalPrice = undefined;
            $scope.CustomerAddress = undefined;
            $scope.CustId = undefined;
            $scope.OrderStatus = undefined;
            $scope.DeliveryStatus = undefined;
            getOrder();
            location.path('Driverdashboard');
        }),
        function (response) {
            alert("Couldn't update the status");
        }

    };
})

//Driver updating the order status
SignIn.controller("UpdateOrderStatusController", function ($scope, UserApi, $location) {
    getOrder();
    function getOrder() {
        UserApi.getOrderzs().then(function (response) {
            $scope.drOrdss = response.data;
        }), function () {
            alert("Couldn't get all the Orders");
        }
    };
})