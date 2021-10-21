'use strict';

angular.module('eStoreAdmin')
    .controller('authCtrl', ['$scope','$location',function authCtrl($scope,$location) {
        //user authentication
        $scope.authenticate = function(email,password) {
            console.log('before sending')
            firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
                //signed in
                console.log('success');
                $location.path('/main');
                $scope.$apply();
           
            })
            .catch(function(error) {
                $scope.authenticationError = error;
                $scope.$apply($scope.authenticationError);
                console.log('error ' + error);
            })
        }
    }])
    .controller('mainCtrl',['$scope',function($scope) {
        //multiple screens for ngInclude directive
        $scope.screens=['Products','Orders'];
        $scope.currentScreen = $scope.screens[0];
        $scope.setScreen = function(index) {
            $scope.currentScreen = $scope.screens[index];
        };

        $scope.setBtnClass = function(btn) {
            return btn==$scope.currentScreen? ' btn btn-block btn-lg btn-primary'
            : 'btn btn-block btn-lg btn-light';
        };

        $scope.getScreen = function() {
            return $scope.currentScreen == 'Products'?
            "view/adminProducts.html":
            "view/adminOrders.html"
        };
    }])
    .controller('orderCtrl', ['$scope',function($scope) {
        $scope.orders = [];
        //request orders from the database
        firebase.database().ref('orders/').once('value').then(function(snapshot){
            var dataObj = snapshot.val();
            angular.forEach(dataObj, function(key, value) {
                $scope.orders.push(key);
            });            
            $scope.$apply($scope.orders);
        }, function error(error) {
            $scope.orders.error=error;
        });
        
        $scope.countTotal = function(order) {
            var result=0;
            order.products.forEach(function(obj) {
                result += obj.count* obj.price;
            });
          return result
        }
        //selects order for the "Details" button
        $scope.selectedOrder;
        $scope.selectOrder = function(order) {
            $scope.selectedOrder = order;
        }
    }])
    .controller('productCtrl', ['$scope', function($scope) {
        //request all data from the database
        $scope.getProducts = function() {
            firebase.database().ref('storeData').once('value').then(function(snapshot) {
                $scope.products=snapshot.val();
                $scope.$apply($scope.products);
            })
        };
        $scope.getProducts();
        $scope.userData=null;//initial data(name,description,category,price) for input strings
        $scope.userIndex;// what product is selected for editing or deleting

        $scope.saveEdited = function(index) {
            var obj = angular.copy($scope.userData);
            firebase.database().ref('storeData/'+ index).update(obj);
            $scope.products[index] = angular.copy(obj);
            $scope.userData=null;
        };

        $scope.edit = function(index) {
            $scope.userIndex = index;
            $scope.userData={};
            $scope.userData.name=$scope.products[index].name;
            $scope.userData.description=$scope.products[index].description;
            $scope.userData.category=$scope.products[index].category;
            $scope.userData.price=$scope.products[index].price;
           
        };

        $scope.cancelEdit = function() {
            $scope.userData=null;
            $scope.userIndex=null;
        };

        $scope.delete = function(index) {
            firebase.database().ref('storeData/' + index).remove();
            $scope.products.splice(index,1);
        };
        //for ngDisabled directive, ensures that user filled all input fields
        $scope.checkInput = function() {
            if($scope.userData) {
                return !($scope.userData.name && 
                $scope.userData.description && 
                $scope.userData.category && 
                $scope.userData.price)
            } else {
                return true
            }
            
        };
        //add new product
        $scope.create = function() {
            firebase.database().ref('storeData/' + $scope.products.length).set($scope.userData);
            $scope.products.push($scope.userData);
            $scope.userData=null;   
        };
    
    }])
