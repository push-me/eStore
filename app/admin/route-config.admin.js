'use strict';

angular.module('eStoreAdmin')
    .config(['$routeProvider', function( $routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl:'view/adminLogin.html'
            })
            .when('/main', {
                redirectTo:function() {
                    if(!firebase.auth().currentUser) return '/login'
                },
                templateUrl:function() {
                    if(firebase.auth().currentUser) return 'view/adminMain.html'
                }
            })
            .otherwise('/login')
    }])