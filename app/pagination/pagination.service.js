'use strict';

angular.module('eStore')
    .factory('paginationService', [function() {
        var itemsPerPage =3;

        return {
            getItemsPerPage: function() {
                    return itemsPerPage;
            }
        }
    }])