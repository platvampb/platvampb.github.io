wheregoHomeApp
	.constant('meeDomain', 'http://wherego-mee.azurewebsites.net')
	.constant('subscribeApi', '/users/subscribe')
	.constant('sendContactEmailApi', '/contact')
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
	}])
	.factory('contactEmailService', ['$http', 'meeDomain', 'sendContactEmailApi', function($http, meeDomain, sendContactEmailApi) {
		var obj = {
				success: false,
				errorMessage: '',
				submit: function(contactData) {
					return $http.post(meeDomain + sendContactEmailApi, {
						'content': contactData
					});
				}
		};
		return obj;
	}]);
