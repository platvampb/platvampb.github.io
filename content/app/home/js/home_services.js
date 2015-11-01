wheregoHomeApp
	.factory('subscribeService', ['$http', 'meeDomain', 'subscribeApi', function($http, meeDomain, subscribeApi) {
		var obj = {
			success: false,
			errorMessage: '',
			submit: function(user) {
				return $http.post(siteConfig.apiEndpoint.mee + siteConfig.apiPath.subscribe, {
					'userInfo': {
						'email': user.email,
						'painPoint': user.painPoint[0],
						'dreamCity': user.dreamCity,
						'fullName': user.fullName,
					}
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
