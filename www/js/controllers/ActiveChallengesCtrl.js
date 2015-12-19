angular.module('activechallengesctrl', [])

.controller('ActiveChallengesCtrl', function($scope, ActiveChallenges, ActiveChallengesFct) {

  ActiveChallengesFct.getActiveChallenges()
    .success(function(data) {
      $scope.activeChallenges = data;
    });
  
  $scope.removeActiveChallenge = function(activeChallenge) {
    ActiveChallengesFct.removeActiveChallenge(activeChallenge);
  };

});