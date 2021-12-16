'use strict';
//used in pagnation, to calculate max number of pages for ngRepeat directive
angular.module('eStore').
    filter('pageCount',function() {
        return function(data, itemsPerPage) {
            if(angular.isArray(data)) {
                var result =[];
                for(var i=0; i<Math.ceil(data.length/itemsPerPage);i++) {
                    result.push(i+1);
                }
                return result
            } else {
                return data
            }
        }
    })