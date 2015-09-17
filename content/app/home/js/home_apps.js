var wheregoHomeApp = angular.module('HomeApp',
	[
		'ngRoute',
		'ngCookies',
		'ngMessages',
		'HomeControllers',
		'metadataControllers'
	]);

wheregoHomeApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/aboutus', {
				templateUrl: 'pages/aboutus.html',
				title:'about wherego'
			}).
			when('/products', {
					templateUrl: 'pages/products.html',
					title:'wherego products',
					navClass: 'nav-inverse'
				}).
			when('/career', {
				templateUrl: 'pages/career.html',
				title:'looking for a senior software engineer - join us as partner!'
			}).
			otherwise({
				redirectTo: '/products'
			});
	}]);

wheregoHomeApp.run(['$location', '$rootScope', function($location, $rootScope) {
		$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
			$rootScope.title = current.$$route.title;
			$rootScope.navClass = current.$$route.navClass;
		});
}]);
