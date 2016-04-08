wheregoHomeApp
	.factory('subscribeService', ['$http', 'siteConfig', function($http, siteConfig) {
		var obj = {
			success: false,
			errorMessage: '',
			submit: function(email) {
				return $http.post(siteConfig.api-endpoint.mee + siteConfig.apiPath.subscribe, {
					'email': email
				});
			}
		};

		return obj;
	}])
	.factory('contactEmailService', ['$http', 'siteConfig', function($http, siteConfig) {
		var obj = {
				success: false,
				errorMessage: '',
				submit: function(contactData) {
					return $http.post(siteConfig.apiEndpoint.mee + siteConfig.apiPath.sendContactEmail, {
						'content': contactData
					});
				}
		};
		return obj;
	}])
	.factory('unsubscribeService', ['$http', 'siteConfig', function($http, siteConfig) {
		var obj = {
			success: false,
			errorMessage: '',
			submit: function(email) {
				return $http.post(siteConfig.apiEndpoint.mee + siteConfig.apiPath.unsubscribe, {
					'email': email
				});
			}
		};
		return obj;
	}]);
