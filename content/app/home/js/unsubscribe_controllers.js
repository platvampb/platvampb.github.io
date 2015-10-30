wheregoHomeApp.controller('unsubscribeCtrl', ['$scope', '$routeParams', 'unsubscribeService', function($scope, $routeParams, unsubscribeService){
	//$scope.email = $routeParams.email;
	$scope.submitted = false;
	$scope.loading = false;
	$scope.notSubscribed = false;
	$scope.result = {};
	$scope.user = {
		email: $routeParams.email
	};

	$scope.unsubscribe = function(isValid, unsubscribeForm) {

		if ($scope.user.email) {
			$scope.loading = true;
			$scope.submitted = true;
			unsubscribeService.submit($scope.user.email).
				then (function(response) {
					var data = response.data;
					if (data.result === true) {
						$scope.result.success = true;
					} else {
						$scope.result.serverError = true;
					}
					$scope.loading = false;
				}, function(response) {
					$scope.loading = false;
					$scope.result.serverError = true;
				});
		}
	}
}]);
