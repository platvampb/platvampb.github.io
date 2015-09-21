function readCookie(name) {
		return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
}

var homeControllers = angular.module('homeControllers', []);

homeControllers.controller('WGProductsCtrl', ['$scope', '$http', 'subscribeService', function($scope, $http, subscribeService) {

	$scope.submitted = false;
	$scope.loading = false;
	$scope.result = {};
	$scope.user = {};

	$scope.submitForm = function(isValid, inviteForm) {

		$scope.submitted = true;

		if (isValid) {
			$scope.loading = true;
			subscribeService.submit($scope.user.email).
				then (function(response) {
					var data = response.data;
					if (data.result === true) {
						$scope.result.success = true;
					} else if (data.message == "SequelizeUniqueConstraintError") {
						$scope.result.emailExists = true;
					} else {
						inviteForm.email.$setValidity('email', false);
					}
					$scope.loading = false;
				}, function(response) {
					$scope.loading = false;
					$scope.result.serverError = true;
				});
		}
	};

	$scope.validate = function (field, inviteForm) {
		inviteForm[field].$validate();
		$scope.result.serverError = false;
	};

	$scope.moveToSubscribe = function () {
		angular.element("html, body").animate({
			scrollTop: angular.element('.keep-me-posted').offset().top
		}, 500);

		angular.element('#subscriberEmail').focus();
	};
}]);

homeControllers.controller('contactCtrl', ['$scope', '$http', 'contactEmailService', function($scope, $http, contactEmailService) {
	$scope.submitted = false;
	$scope.loading = false;
	$scope.result = {};
	$scope.contact = {};

	$scope.submitForm = function(isValid, inviteForm) {

		$scope.submitted = true;

		if (isValid) {
			$scope.loading = true;
			contactEmailService.submit($scope.contact).
				then (function(response) {
					var data = response.data;
					if (data.result === true) {
						$scope.result.success = true;
					} else if (data.message == "SequelizeUniqueConstraintError") {
						$scope.result.exists = true;
					} else {
						inviteForm.email.$setValidity('email', false);
					}
					$scope.loading = false;
				}, function(response) {
					$scope.loading = false;
					$scope.result.serverError = true;
				});
		}
	};

	$scope.validate = function (field, inviteForm) {
		inviteForm[field].$validate();
		$scope.result.serverError = false;
	};
}]);

var metadataControllers = angular.module('metadataControllers', []);

metadataControllers.controller('metaCtrl', function($scope, $http) {
	$http.get("metadata.json").success(function(data) {
		$scope.metadata = data;
	});
});
