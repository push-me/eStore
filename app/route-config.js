'use strict';

angular.module('eStore').
	config(['$locationProvider','$routeProvider',function config($locationProvider,$routeProvider) {
		$locationProvider.hashPrefix('!');
		function route(url) {
			if(location.hostname=='localhost') {
				return url
			} else {
				return '/eStore/app/' + url
			}
		}
		$routeProvider.
			when('/checkout', {
				templateUrl:route('/checkout/checkout.template.html')
			}).
			when('/complete', {
				templateUrl:route('/checkout/thanks.template.html')
			}).
			when('/placeorder', {
				templateUrl:route('/checkout/placeOrder.template.html')
			}).
			when('/products', {
				templateUrl:'productList.html'
			}).
			when('/home', {
				templateUrl:'productList.html'
			}).
			otherwise('/home');
	}])