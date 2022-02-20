'use strict';

angular.module('eStoreAdmin')
    .controller('authCtrl', [
        'database',
        '$scope',
        '$location',
        function authCtrl(database,$scope,$location) {
        //user authentication
        $scope.authenticate = function(email,password) {
            var data = {
                email:email,
                password:password
            }
            database.signIn('email',data).then(function() {
                $location.path('/main');
                $scope.$apply();
            }).catch(function(error) {
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
    .controller('orderCtrl', ['database','$scope',function(database,$scope) {
        $scope.orders = [];
        //request orders from the database
        $scope.getOrders = function() {
            database.read('orders/').then(function(response) {
            
                var dataObj = database.parse(response);
                 angular.forEach(dataObj, function(value, key) {
                    value.id = key;
                    $scope.orders.push(value);
                 });
                 $scope.$apply($scope.orders); 
            },function error(error) {
                $scope.orders.error=error;
            })
        }  
        
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

        $scope.setDetailsBtnClass = function(id) {
            if($scope.selectedOrder) {// check existence
                return $scope.selectedOrder.id == id? 'btn btn-primary detailsPressed':'btn btn-primary';
            } else return
            
        }
    }])
    .controller('productCtrl', ['database','$scope', function(database,$scope) {
        //request all data from the database
        $scope.getProducts = function() {
            database.read('storeData').then(function(response) {
                $scope.products=database.parse(response);
                $scope.$apply($scope.products);
            })
        };
        
        $scope.userData=null;//initial data(name,description,category,price) for input strings
        $scope.userIndex;// what product is selected for editing or deleting
        $scope.productExists=false; //to make sure that the new product is unique

        $scope.saveEdited = function(id,index) {
            var obj = angular.copy($scope.userData);
            database.update('storeData/' + id, obj, function(error) {
                if(error) {
                    console.log('update failed');
                } else { //success
                    $scope.products[index] = angular.copy(obj);
                    $scope.userData=null;
                    $scope.userIndex=null;
                    $scope.$apply($scope.products);
                }
            });
        };

        $scope.edit = function(index) {
            var collection =['name','description','category','price'];
            $scope.userIndex = index;
            $scope.userData={};
            collection.forEach(function(item) {
                $scope.userData[item]=$scope.products[index][item];
            })
           
        };

        $scope.cancelEdit = function() {
            $scope.userData=null;
            $scope.userIndex=null;
        };

        $scope.delete = function(id,index) {
            database.delete('storeData/'+ id).then(function() {
                $scope.products.splice(index,1);
                $scope.$apply($scope.products);
            }).catch(function(error) {
                console.log(error);
                console.log(error.message);
            })
            
        };
        //for ngDisabled directive, ensures that user filled all input fields
        $scope.checkInput = function() {
            var data = $scope.userData;
            if(data) {
                var condition = data.name && data.description && data.category && data.price && !$scope.productExists;
                return !(condition)
            } else {
                return true
            }
            
        };
        //handles info message
        $scope.infoHandler = function() {
            $scope.productExists = false;
            if($scope.products) {
                $scope.products.forEach(function(item) {
                    if($scope.userData) {//info fields are not empty
                        if(item.name == $scope.userData.name) {
                            $scope.productExists = true; 
                        }
                    }
                      
                })

                if($scope.productExists) return 'this product already exists';
            }
            
            return 'please, fill all the fields to create a new product';
        };
        //behavior to switch classes for ng-class directive
        $scope.showWarning = function() {
            if($scope.productExists) {
                return "alert alert-warning text-center"
            }
            return "alert alert-primary text-center"
        };
        //add a new product
        $scope.create = function() {
            $scope.userData.id = database.keyGen();
            database.create('storeData/'+$scope.userData.id,$scope.userData, function(error) {
                if(error) {
                    console.log('failed to create a product');
                } else { //success
                    $scope.products.push($scope.userData);
                    $scope.userData=null;
                    $scope.$apply($scope.products);
                    
                }
                 
            })
        };
    
    }])
