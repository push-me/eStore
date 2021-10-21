'use strict';

angular.module('eStore')
.controller('checkoutController', ['$scope', 'cart', function($scope, cart) {
    $scope.cartData = cart.getProducts();
    $scope.countTotal = function() {
       var total = 0;
       $scope.cartData.forEach(function(item) {
            total += item.price * item.count;
       })
       
       return total
    };

    $scope.remove = function(id) {
       cart.removeProduct(id);
    };

}])
