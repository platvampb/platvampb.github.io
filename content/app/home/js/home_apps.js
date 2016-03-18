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

angular.module('HomeApp').provider('siteConfig', function () {
	var options = {};
	this.config = function (opt) {
		angular.extend(options, opt);
	};
	this.$get = [function () {
		if (!options) {
		throw new Error('Config options must be configured');
		}

		var getConfig = function (url) {
			$.ajax({
				url: url,
				type: "get",
				async: false,
				cache: false,
				dataType: "json"
			})
			.done(function(data) {
				angular.extend(options, data);
			})
			.fail(function(data) {
				console.log("Error loading config: " + data);
			});
		};

		angular.forEach(['config/config.env.json','config/config.common.json'], function(url) {
			getConfig(url);
		});

		return options;
	}];
});
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
				title: 'looking for a senior software engineer - join us as partner!'
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
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
		$rootScope.title = current.title;
		$rootScope.navClass = current.navClass;
		if ($routeParams.scrollTo) {
			$location.hash($routeParams.scrollTo);
			$anchorScroll();
		}
		$window.scrollTo(0,0);
	});
}]);
