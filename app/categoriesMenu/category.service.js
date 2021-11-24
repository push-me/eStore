'use strict';

angular.module('eStore')
    .factory('category', [function() {
        var selectedCategory;

        return {
            getCategory: function() {
                if(selectedCategory) {
                    return selectedCategory;
                } else return null;
            },

            setCategory:function(val) {
                selectedCategory = val;
            }
        }
    }])