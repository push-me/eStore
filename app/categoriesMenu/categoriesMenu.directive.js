"use strict";

angular.module('eStore')
    .directive('categoriesMenu', ['category',function(category) {
        return {
            restrict: "E",
            templateUrl:"categoriesMenu/categoriesMenu.html",
            controller: function($scope) {
                $scope.initial = 'Categories';
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