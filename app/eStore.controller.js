'use strict';

angular.module('eStore')
    .controller('eStoreController',[
        'database',
        '$scope',
        'returnUniqueFilter',
        'cart',
        '$location', 
        function(database,$scope,returnUniqueFilter, cart,$location) {
        $scope.data={};

        var changePath = function(path,expression) {
            $location.path(path);
            $scope.$apply(expression);
        };
        //callback for create operation
        var complete = function(error) {
            if(error) {
                console.log('write failed');
            } else {  
                $scope.cartData = [];
                changePath('/complete',$scope.cartData);
            }
            
        }

        $scope.sendOrder = function(data) {
            var order = angular.copy(data);
            order.products = angular.copy(cart.getProducts());
            var orderKey = database.keyGen();// unique key generation
            $scope.orderKey = orderKey;
            //Connect to database to make a record
            var ref = 'orders/' + orderKey;
            database.create(ref,order,complete);
        };

        $scope.getData = function() {
            database.signIn().then(function() {
                database.read('storeData').then(function(response) {
                    $scope.data.products = database.parse(response);//[{},{}]
                    $scope.uniqueCategories = returnUniqueFilter($scope.data.products,'category');
                    changePath('/products',$scope.data.products);
                }).catch(function(error) {
                    console.log('errorCode: '+ error.code);
                    console.log('error message: ' + error.message);
                })
            })
            
        }
        
    }])