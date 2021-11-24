'use strict';

angular.module('eStore').
    constant('productListActiveClass','btn-primary').
    controller('productListController', [
        '$scope',
        'cart',
        'productListActiveClass',
        'category',
         function($scope, cart, productListActiveClass,category) {
            //var selectedCategory = null;
            $scope.selectedPage = 1;
            $scope.totalPages = 3;
            $scope.selectCategory = function(userChoise) {
                //selectedCategory = userChoise;
                category.setCategory(userChoise);
                $scope.selectedPage = 1;
            };

            $scope.selectPage = function(newPage) {
                $scope.selectedPage = newPage;
            };

            $scope.categoryFilterFn = function(productData) {
                console.log(category.getCategory());
                return category.getCategory() == null || productData.category == category.getCategory()
            };

            $scope.setSelectedClass = function(data) {
                if(angular.isNumber(data)) { //page-number
                    return $scope.selectedPage == data?
                    'btn btn-block btn-sm '+ productListActiveClass:
                    'btn btn-light btn-sm'
                } else { //category-string
                    return category.getCategory() == data? 
                    'btn btn-block btn-lg '+ productListActiveClass :
                    'btn btn-block btn-light btn-lg'
                }
 
            };

            $scope.getCategory = function() {
                if(category.getCategory()) {
                    return category.getCategory();
                } else return 'Categories';
            }

            $scope.addToCart = function(item) {
                cart.addProduct(item.id,item.name,item.price);
            };

            
         }
    ])