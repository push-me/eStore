'use strict';

angular.module('eStore').
    constant('productListActiveClass','btn-primary').
    controller('productListController', [
        '$scope',
        'cart',
        'productListActiveClass',
        'category',
        'paginationService',
         function($scope, cart, productListActiveClass,category,paginationService) {
            $scope.selectedPage = null;
            $scope.totalPages = paginationService.getItemsPerPage();
            $scope.selectCategory = function(userChoise) {
                if(!userChoise) {
                    category.setCategory('');
                }
                category.setCategory(userChoise);
                $scope.selectedPage = 1;
            };

            $scope.selectPage = function(newPage) {
                $scope.selectedPage = newPage;
            };

            $scope.categoryFilterFn = function(productData) {
                return category.getCategory() == null || category.getCategory() == 'Home'  || productData.category == category.getCategory()
            };

            $scope.setSelectedClass = function(data) {
                if(angular.isNumber(data)) { //page-number
                    return $scope.selectedPage == data?
                    'btn-sm noShadow '+ productListActiveClass:
                    'btn-sm'
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