'use strict';

angular.module('eStore').
    constant('productListActiveClass','btn-primary').
    controller('productListController', [
        '$scope',
        'cart',
        'productListActiveClass',
         function($scope, cart, productListActiveClass) {
            var selectedCategory = null;
            $scope.selectedPage = 1;
            $scope.totalPages = 3;
            $scope.selectCategory = function(userChoise) {
                selectedCategory = userChoise;
                $scope.selectedPage = 1;
            };

            $scope.selectPage = function(newPage) {
                $scope.selectedPage = newPage;
            };

            $scope.categoryFilterFn = function(productData) {
                return selectedCategory == null || productData.category == selectedCategory
            };

            $scope.setSelectedClass = function(data) {
                if(angular.isNumber(data)) { //page-number
                    return $scope.selectedPage == data?
                    'btn btn-block btn-sm '+ productListActiveClass:
                    'btn btn-light btn-sm'
                } else { //category-string
                    return selectedCategory == data? 
                    'btn btn-block btn-lg '+ productListActiveClass :
                    'btn btn-block btn-light btn-lg'
                }
 
            };

            $scope.addToCart = function(item) {
                cart.addProduct(item.id,item.name,item.price);
            };

            
         }
    ])