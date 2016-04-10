wheregoHomeApp
	.factory('subscribeService', ['$http', 'siteConfig', function($http, siteConfig) {
		var obj = {
			success: false,
			errorMessage: '',
			submit: function(user) {
				return $http.post(siteConfig.apiEndpoint.mee + siteConfig.apiPath.subscribe, {
					'email': user.email,
					'answers': Object.keys(user.answers).map(function(key) {
						var answerObj = user.answers[key]
						if (typeof(answerObj.answer) === "object" && !Array.isArray(answerObj.answer)) {
							//the only type of answer that is object but not array = location search
							var regionName = answerObj.answer.name.split(' - ');
							answerObj.answer = regionName.join('::');
						}
						return user.answers[key];
					}),
					'fullName': user.fullName
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
	}])
	.factory('questionsService', ['$http', 'siteConfig', function($http, siteConfig) {
		var obj = {
			getQuestions: function(user) {
				return $http.get(siteConfig.apiEndpoint.mee + siteConfig.apiPath.questions);
			}
		};

		return obj;
	}])
	.factory('citySearchService', ['$http', 'siteConfig', function($http, siteConfig) {
		var obj = {
			searchCities: function(key) {
				return $http.get(siteConfig.apiEndpoint.malloc + siteConfig.apiPath.regionSearch + "?key=" + key + "&limit=10");
			}
		};

		return obj;
	}])
	;
