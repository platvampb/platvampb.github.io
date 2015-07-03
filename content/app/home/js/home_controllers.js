function readCookie(name) {
    return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
}

var HomeControllers = angular.module('HomeControllers', []);

HomeControllers.controller('WGHomeLanCtrl', function($scope, $http) {
	
	$http.get("lan/lan_en.json").success(function(data) {
		$scope.text = data;
		if (Math.floor((Math.random() * 10) + 1)%2==0)
	  	{
			$scope.urlToPick = $scope.text.url_card_survey;
		}
		else
		{
			$scope.urlToPick = $scope.text.url_share_survey;
		}
	});
});


var metadataControllers = angular.module('metadataControllers', []);

metadataControllers.controller('metaCrl', function($scope, $http) {
	$http.get("metadata.json").success(function(data) {
		$scope.metadata = data;
	});
});

var LoginControllers = angular.module('LoginControllers', []);

HomeControllers.controller('loginCrl', function($scope) {
	$scope.email='abc';
});