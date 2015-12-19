angular.module('auth', ['ngCordovaOauth'])

.controller('AuthCtrl', ['$scope', 'AuthFct', function($scope, AuthFct) {

  $scope.login = function() {
    AuthFct.login();
  };

}]);