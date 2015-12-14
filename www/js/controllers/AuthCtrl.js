angular.module('auth', [])

.controller('AuthCtrl', function($scope) {

    $scope.data = {};
 
    $scope.login = function() {
      console.log("username: " + $scope.data.username + " and password: " + $scope.data.password);
      window.open('http://bestrida.herokuapp.com/api/register', '_blank', 'location=yes');
    }

})