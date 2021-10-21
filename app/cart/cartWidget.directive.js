'use strict';

angular.module('cart')
    .directive('cartWidget', ['cart',function(cart) {
        return {
            restrict: "E",
            templateUrl:"cart/cartWidget.html",
            controller: function($scope) {
                $scope.cartData = cart.getProducts();
                $scope.countTotal = function() {
                    var total = 0;
                   $scope.cartData.forEach(function(cartObj,i) {
                       total += cartObj.count * cartObj.price;
                   })
                   return total
                };

                $scope.itemCount = function() {
                    var total = 0;
                    $scope.cartData.forEach(function(cartObj,i) {
                        total += cartObj.count;
                    })
                    return total
                };

            }
        }
    }])