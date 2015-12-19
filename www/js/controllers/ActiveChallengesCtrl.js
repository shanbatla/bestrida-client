angular.module('activechallengesctrl', [])

.controller('ActiveChallengesCtrl',['$scope', 'ActiveChallengesFct', 'AuthFct', function($scope, ActiveChallengesFct, AuthFct) {

  $scope.user = AuthFct.user.athlete;

  ActiveChallengesFct.getActiveChallenges($scope.user.id)
    .success(function(data) {
      $scope.activeChallenges = data;
      $scope.activeChallenges.forEach(function(challenge) {
        if($scope.user.id !== challenge.challengeeId) {
          challenge.opponent = challenge.challengeeName;
        } else if($scope.user.id !== challenge.challengerId) {
          challenge.opponent = challenge.challengerName;
        } else {
          challenge.opponent = "Opponent";
        }
      });
    });
  var userId = $scope.user.id;
  $scope.removeActiveChallenge = function(activeChallenge, userId) {
    ActiveChallengesFct.removeActiveChallenge(activeChallenge, userId);
  };

}]);