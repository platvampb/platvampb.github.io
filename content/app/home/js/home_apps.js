var wheregoHomeApp = angular.module('HomeApp', [
                'ngRoute',
                'ngCookies',
		        'HomeControllers',
		        'metadataControllers'
		        ]);

wheregoHomeApp.config(['$routeProvider',
                    function($routeProvider) {
                      $routeProvider.
                        when('/aboutus', {
                        	templateUrl: 'pages/aboutus.html'
                        }).
                        when('/products', {
                            templateUrl: 'pages/products.html'
                          }).
                        when('/jobs', {
                        	templateUrl: 'pages/jobs.html'
                        }).
                        when('/jobs/E0001', {
                            templateUrl: 'pages/jobs/job_E0001.html'
                          }).
                        otherwise({
                          redirectTo: '/products'
                        });
                    }]);