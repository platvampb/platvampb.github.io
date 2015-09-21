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
			when('/products', {
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
				title:'Contact Us'
			}).
			otherwise({
				redirectTo: '/products'
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

wheregoHomeApp.directive('elastic', [
                                     '$timeout',
                                     function($timeout) {
                                         return {
                                             restrict: 'A',
                                             link: function($scope, element) {
                                                 $scope.initialHeight = $scope.initialHeight || element[0].style.height;
                                                 var resize = function() {
                                                     element[0].style.height = $scope.initialHeight;
                                                     element[0].style.height = "" + element[0].scrollHeight + "px";
                                                 };
                                                 element.on("input change", resize);
                                                 $timeout(resize, 0);
                                             }
                                         };
                                     }
                                 ]);
