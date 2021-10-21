'use strict';

angular.module('eStore')
    .controller('eStoreController',[
        '$scope',
        'returnUniqueFilter',
        'cart',
        '$location', 
        function($scope,returnUniqueFilter, cart,$location) {
        $scope.data={};

        var changePath = function(path,expression) {
            $location.path(path);
            $scope.$apply(expression);
        };

        $scope.sendOrder = function(data) {
            var order = angular.copy(data);
            order.products = angular.copy(cart.getProducts());
            var orderKey = firebase.database().ref().push().key;// unique key generation
            //Connect to database to make a record
            firebase.database().ref('orders/'+ orderKey).set(order, function(error) {
                if(error) {
                    $scope.data.orderError = error;
                } else { //success
                    $scope.orderKey = orderKey;
                    $scope.cartData = [];
                    changePath('/complete',$scope.cartData);
                }
            })
        };

        $scope.getData = function() {
           return firebase.auth().signInAnonymously().then(function() {
                return firebase.database().ref('storeData').once('value');
            }).then(function(snapshot) { //success
                $scope.data.products = snapshot.val();            
                $scope.uniqueCategories = returnUniqueFilter($scope.data.products,'category');
                console.log(snapshot.val());
                changePath('/products',$scope.data.products);
            }).catch(function(error) {
                console.log('errorCode: '+ error.code);
                console.log('error message: ' + error.message);
            })
        }
        
    }])