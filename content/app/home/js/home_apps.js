var wheregoHomeApp = angular.module('HomeApp',
	[
		'ngRoute',
		'ngCookies',
		'ngAnimate',
		'ngMessages',
		'ui.bootstrap',
		'homeControllers',
		'metadataControllers'
	]);

wheregoHomeApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/aboutus', {
				templateUrl: 'pages/aboutus.html',
				title:'About Wherego'
			}).
			when('/', {
					templateUrl: 'pages/products.html',
					title:'Wherego Products',
					navClass: 'nav-inverse',
					controller: 'WGProductsCtrl'
				}).
			when('/career', {
				templateUrl: 'pages/career.html',
				title:'looking for a senior software engineer - join us as partner!'
			}).
			when('/contactus', {
				templateUrl: 'pages/contactus.html',
				title:'Contact Wherego',
				controller: 'contactCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);

wheregoHomeApp.run(['$location', '$rootScope', '$window', '$anchorScroll', '$routeParams', function($location, $rootScope, $window, $anchorScroll, $routeParams) {
		$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
				$rootScope.title = current.$$route.title;
				$rootScope.navClass = current.$$route.navClass;
				if ($routeParams.scrollTo) {
					$location.hash($routeParams.scrollTo);
					$anchorScroll();
				}
				$window.scrollTo(0,0);
		});
}]);
