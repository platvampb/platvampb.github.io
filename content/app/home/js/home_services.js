wheregoHomeApp
	.constant('meeDomain', 'http://wherego-mee.azurewebsites.net')
	.constant('subscribeApi', '/users/subscribe')
	.factory('subscribeService', ['$http', 'meeDomain', 'subscribeApi', function($http, meeDomain, subscribeApi) {
		var obj = {
			success: false,
			errorMessage: '',
			submit: function(email) {
				return $http.post(meeDomain + subscribeApi, {
					'email': email
				});
			}
		};

		return obj;
	}]);
