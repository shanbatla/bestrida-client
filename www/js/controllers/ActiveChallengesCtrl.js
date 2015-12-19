angular.module('activechallengesctrl', [])

.controller('ActiveChallengesCtrl',['$scope', 'ActiveChallengesFct', 'AuthFct', function($scope, ActiveChallengesFct, AuthFct) {

  $scope.user = AuthFct.user.athlete;

  ActiveChallengesFct.getActiveChallenges($scope.user.id)
    .success(function(data) {
      $scope.activeChallenges = data;
    });
  var userId = $scope.user.id;
  $scope.removeActiveChallenge = function(activeChallenge, userId) {
    ActiveChallengesFct.removeActiveChallenge(activeChallenge, userId);
  };

}]);