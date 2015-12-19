angular.module('completed', [])

.controller('CompletedCtrl', ['$scope','CompletedFct', 'AuthFct',function($scope, CompletedFct, AuthFct) {
  
  $scope.user = AuthFct.user.athlete;

  CompletedFct.getCompletedChallenge($scope.user.id)
    .success(function(data) {
      $scope.challenges = data;
    })
    .error(function(error) {
      alert(error);
    });

}]);