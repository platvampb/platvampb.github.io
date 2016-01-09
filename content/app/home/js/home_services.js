wheregoHomeApp
	.constant('subscribeApi', '/users/subscribe')
	.constant('sendContactEmailApi', '/contact')
	.constant('unsubscribeApi', '/users/unsubscribe')
	.constant('questionsApi', '/questions')
	.constant('regionSearchApi', '/regions/places/search')
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
							var regionName = [];
							['name', 'belongsToProvince', 'belongsToCountry'].map(function(prop) {
								if (answerObj.answer[prop]) {
									regionName.push(answerObj.answer[prop]);
								}
							});
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
	.factory('questionsService', ['$http', 'meeDomain', 'questionsApi', function($http, meeDomain, questionsApi) {
		var obj = {
			getQuestions: function(user) {
				return $http.get(meeDomain + questionsApi);
			}
		};

		return obj;
	}])
	.factory('citySearchService', ['$http', 'mallocDomain', 'regionSearchApi', function($http, mallocDomain, regionSearchApi) {
		var obj = {
			getQuestions: function(key) {
				return $http.get(mallocDomain + regionSearchApi + "?key=" + key + "&limit=10");
			}
		};

		return obj;
	}])
	;
