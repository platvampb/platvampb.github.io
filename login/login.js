angular.module('app')
.controller('LoginCtrl', ['$scope', 'auth', 'store', '$location', loginCtrlFunc]);

function loginCtrlFunc($scope, auth, store, $location){
  $scope.auth = auth;

  $scope.user = '';
  $scope.pass = '';

  function onLoginSuccess(profile, token) {
    $scope.message = '';
    store.set('profile', profile);
    store.set('token', token);
    $location.path('/');
    $scope.loading = false;
  }

  function onLoginFailed() {
    $scope.message = 'invalid credentials';
    $scope.loading = false;
  }

  $scope.login = function () {
    // Show loading indicator
    $scope.message = 'loading...';
   $scope.loading = true;
   auth.signin({
     connection: 'mee-qa',
     username: $scope.user,
     password: $scope.pass,
     authParams: {
       scope: 'openid app_metadata'
     }
   });
  }

  $scope.signup = function () {
    // Show loading indicator
    $scope.message = 'loading...';
   $scope.loading = true;
   auth.signup({
     connection: 'mee-qa',
     username: $scope.user,
     password: $scope.pass,
     authParams: {
       scope: 'openid app_metadata'
     }
   });
  }


  $scope.facebookLogin = function () {
    $scope.message = 'loading...';
    $scope.loading = true;

    auth.signin({
      connection: 'facebook',
      scope: 'openid app_metadata'
    });
  };

}
