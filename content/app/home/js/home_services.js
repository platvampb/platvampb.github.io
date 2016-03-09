wheregoHomeApp
	.constant('meeDomain', 'http://ec2-52-86-126-166.compute-1.amazonaws.com')
	.constant('subscribeApi', '/users/subscribe')
	.constant('sendContactEmailApi', '/contact')
	.constant('unsubscribeApi', '/users/unsubscribe')
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
	}])
	.factory('unsubscribeService', ['$http', 'meeDomain', 'unsubscribeApi', function($http, meeDomain, unsubscribeApi) {
		var obj = {
			success: false,
			errorMessage: '',
			submit: function(email) {
				return $http.post(meeDomain + unsubscribeApi, {
					'email': email
				});
			}
		};
		return obj;
	}]);
