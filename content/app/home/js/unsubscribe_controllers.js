wheregoHomeApp.controller('unsubscribeCtrl', ['$scope', '$routeParams', function($scope, $routeParams){
	//$scope.email = $routeParams.email;
	$scope.submitted = false;
	$scope.loading = false;
	$scope.result = {};
	$scope.user = {};

	$scope.unsubscribe = function() {

		if ($scope.email) {
			$scope.loading = true;
			subscribeService.submit($scope.email).
				then (function(response) {
					var data = response.data;
					if (data.result === true) {
						$scope.success = true;
					} else if (data.message == "SequelizeUniqueConstraintError") {
						$scope.emailDNE = true;
					} else {
						inviteForm.email.$setValidity('email', false);
					}
					$scope.loading = false;
				}, function(response) {
					$scope.loading = false;
					$scope.result.serverError = true;
				});
		}
	}
}]);
