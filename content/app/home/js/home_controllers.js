function readCookie(name) {
		return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
}

var HomeControllers = angular.module('HomeControllers', []);

HomeControllers.controller('WGHomeLanCtrl', ['$scope', '$http', 'subscribeService', function($scope, $http, subscribeService) {

	$scope.submitted = false;
	$scope.result = {};
	$scope.user = {};

	$scope.submitForm = function(isValid) {

		$scope.submitted = true;

		if (isValid) {
			subscribeService.submit($scope.user.email).
				then (function(response) {
					$scope.result.success = true;
				}, function(response) {
					$scope.result.success = true;
					//$scope.result = response;
				});
		}
	};

	$scope.moveToSubscribe = function () {
		$('body').animate({
			scrollTop: $('.keep-me-posted').offset().top
		}, 500);

		$('input[name=email]').focus();
	};
}]);


var metadataControllers = angular.module('metadataControllers', []);

metadataControllers.controller('metaCrl', function($scope, $http) {
	$http.get("metadata.json").success(function(data) {
		$scope.metadata = data;
	});
});

var LoginControllers = angular.module('LoginControllers', []);

HomeControllers.controller('loginCrl', function($scope) {
	$scope.email='abc';
});
