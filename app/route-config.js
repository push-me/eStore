'use strict';

angular.module('eStore').
	config(['$locationProvider','$routeProvider',function config($locationProvider,$routeProvider) {
		$locationProvider.hashPrefix('!');
		$routeProvider.
			when('/checkout', {
				templateUrl:'/checkout/checkout.template.html'
			}).
			when('/complete', {
				templateUrl:'/checkout/thanks.template.html'
			}).
			when('/placeorder', {
				templateUrl:'/checkout/placeOrder.template.html'
			}).
			when('/products', {
				templateUrl:'productList.html'
			}).
			when('/home', {
				templateUrl:'productList.html'
			}).
			otherwise('/home');
	}])