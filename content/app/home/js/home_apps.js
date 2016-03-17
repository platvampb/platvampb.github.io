var wheregoHomeApp = angular.module('HomeApp',
	[
		'ngRoute',
		'ngCookies',
		'ngAnimate',
		'ngMessages',
		'ui.bootstrap',
		'homeControllers',
		'metadataControllers',
		'ui.router'
	]);

wheregoHomeApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/aboutus', {
				templateUrl: 'pages/aboutus.html',
				title: 'About Wherego'
			}).
			when('/', {
				templateUrl: 'pages/products.html',
				title: 'Wherego Products',
				navClass: 'nav-inverse',
				controller: 'WGProductsCtrl'
			}).
			when('/career', {
				templateUrl: 'pages/career.html',
				title: 'looking for Software Engineer of all level - join us as partner!'
			}).
			when('/contactus', {
				templateUrl: 'pages/contactus.html',
				title: 'Contact Wherego',
				controller: 'contactCtrl'
			}).
			when('/unsubscribe/:email', {
				templateUrl: 'pages/unsubscribe.html',
				title: 'unsubscribe from Wherego mailing list'
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);

wheregoHomeApp.run(['$location', '$rootScope', '$window', '$anchorScroll', '$routeParams', function($location, $rootScope, $window, $anchorScroll, $routeParams) {
	$window.ga('create', 'UA-75138848-2', 'auto');
	$window.ga('require', 'linkid');
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
		$rootScope.title = current.title;
		$rootScope.navClass = current.navClass;
		if ($routeParams.scrollTo) {
			$location.hash($routeParams.scrollTo);
			$anchorScroll();
		}
		$window.scrollTo(0,0);
	});
	$rootScope.$on('$stateChangeSuccess', function (event) {
		$window.ga('send', 'pageview', $location.path());
	});
}]);