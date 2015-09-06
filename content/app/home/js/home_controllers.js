function readCookie(name) {
    return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
}

var HomeControllers = angular.module('HomeControllers', []);

HomeControllers.controller('WGHomeLanCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.submitForm = function(isValid) {
    $scope.submitted = true;
    if (isValid) {
      alert('our form is amazing');
    }
  };

  $scope.moveToSubscribe = function () {
    angular.element(('body')).animate({
      scrollTop: angular.element('.keep-me-posted').offset().top
    }, 500);

    angular.element('input[name=email]').focus();
  };
}]);

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
