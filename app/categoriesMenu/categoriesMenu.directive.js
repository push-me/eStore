"use strict";

angular.module('eStore')
    .directive('categoriesMenu', ['$location','category',function($location,category) {
        return {
            restrict: "E",
            templateUrl:"categoriesMenu/categoriesMenu.html",
            controller: function($scope) {
                $scope.initial = 'Categories';

                $scope.display = function() {
                   if($location.path() == '/products') {
                       return true
                   } else return false;     
                }
                
                $scope.getCategory = function() {
                    if($scope.initial) {
                        return $scope.initial;
                    } else {
                        return category.getCategory();
                    }                
                }

                $scope.selectCategory = function(cat) {
                    $scope.initial = null;
                    return category.setCategory(cat);
                }
            } 
        }
    }])