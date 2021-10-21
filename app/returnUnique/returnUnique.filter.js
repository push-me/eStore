'use strict';
//Used to create a unique collection of categories
angular.module('returnUnique')
    .filter('returnUnique', function() {
        return function(data,property) {
            if(angular.isArray(data) && angular.isString(property)) { //check data format
                var result = [];
                var keys = {};
                data.forEach(function(object) {
                    var value = object[property];
                    if(angular.isUndefined(keys[value])) { //unique
                        keys[value] = true;
                        result.push(value);
                    }
                })
                return result 
            } else {
                return data
            }
           
        }
        
    })