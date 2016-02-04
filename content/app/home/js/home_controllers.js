function readCookie(name) {
		return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
}

var homeControllers = angular.module('homeControllers', []);

homeControllers.controller('WGProductsCtrl', ['$scope', '$http', 'subscribeService', function($scope, $http, subscribeService) {

	$scope.submitted = false;
	$scope.loading = false;
	$scope.result = {};
	$scope.user = {};

	//initialize boostrap select
	$scope.submitForm = function(isValid, inviteForm) {

		$scope.submitted = true;

		if (isValid) {
			$scope.loading = true;
			subscribeService.submit($scope.user).
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

homeControllers.controller('aboutUsCtrl', ['$scope', '$anchorScroll', '$location', function($scope, $anchorScroll, $location) {

	$scope.moveDownSection = function ($event) {
		angular.element("html, body").animate({
			scrollTop: angular.element($event.currentTarget).closest('section').next().offset().top
		}, 500);
	}
}]);

homeControllers.controller('questionsCtrl', ['$scope', '$http', 'questionsService', 'citySearchService', function($scope, $http, questionsService, citySearchService) {
	questionsService.getQuestions($scope.contact)
	.then (function(response) {
		var data = response.data;
		if (data.result === true) {
			$scope.questions = data.data;
		}

		$scope.user.answers = {};
		for (var i = 0, length = $scope.questions.length; i < length; i++) {
			$scope.user.answers[$scope.questions[i].id] = {
				questionId: $scope.questions[i].id,
				answer: ''
			};
		}
	});

	$scope.$on('optionsLoaded', function(optionsLoadedEvent, data) {
		//initialize select picker
		if (data.question.displayType == "select") {
			$('#' + data.inputId).selectpicker();
			var $visible = $('#' + data.inputId).parent().find('.bootstrap-select');

			$visible.find('.dropdown-menu a').click(function(event) {
				$visible.removeClass('open');
				$visible.find('.dropdown-toggle').addClass('selected');
			});
		} else if (data.question.displayType == "multi-select") {
			$('#' + data.inputId + '.selectpicker').selectpicker();
		}
	});

	$scope.getRegion = function(searchString) {
		return citySearchService.searchCities(searchString)
		.then (function(response) {
			var data = response.data;
			if (data.count > 0) {
				data.values.map(function(region) {
					region.displayName = region.name;
					return region;
				});
			}

			return data.values;
		});
	};
}]);

homeControllers.controller('contactCtrl', ['$scope', '$http', 'contactEmailService', function($scope, $http, contactEmailService) {
	$scope.submitted = false;
	$scope.contactLoading = false;
	$scope.result = {};
	$scope.contact = {};

	$scope.submitForm = function(isValid, contactForm) {
		$scope.submitted = true;
		$scope.result.conactSuccess = false;
		$scope.result.serverError = false;
		if (isValid) {
			$scope.contactLoading = true;
			contactEmailService.submit($scope.contact)
			.then (function(response) {
				var data = response.data;
				if (data.result === true) {
					$scope.result.conactSuccess = true;
				} else {
					$scope.result.serverError = true;
				}
				$scope.contactLoading = false;
			}, function(response) {
				$scope.contactLoading = false;
				$scope.result.serverError = true;
			});
		}
	};

	$scope.validate = function(field, contactForm) {
		contactForm[field].$validate();
	};
}]);

var metadataControllers = angular.module('metadataControllers', []);

metadataControllers.controller('metaCtrl', function($scope, $http) {
	$http.get("metadata.json").success(function(data) {
		$scope.metadata = data;
	});
});
