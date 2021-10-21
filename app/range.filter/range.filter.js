'use strict';
//used for pagination, filters elements when user selects pages
angular.module('eStore').
    filter('range',[function() {
        return function(input,selectedPage,itemsPerPage) {
            if(angular.isArray(input) && angular.isNumber(selectedPage) && angular.isNumber(itemsPerPage)) {
                //starting position, number of items before the selected page 
                var start_index = (selectedPage-1)*itemsPerPage;
                
                if(start_index > input.length) {
                    return [];
                } else {// outputs specified number of items for the selected page
                    return input.splice(start_index,itemsPerPage);
                }
            } else {
                return input;
            }
        }
    }]);