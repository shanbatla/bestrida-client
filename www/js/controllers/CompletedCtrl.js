angular.module('completed', [])

.controller('CompletedCtrl', ['$scope','CompletedFct', 'AuthFct',function($scope, CompletedFct, AuthFct) {
  
  $scope.user = AuthFct.user.athlete;

  CompletedFct.getCompletedChallenge($scope.user.id)
    .success(function(data) {
      $scope.challenges = data;
      $scope.challenges.forEach(function(challenge) {
        if($scope.user.id !== challenge.challengeeId) {
          challenge.opponent = challenge.challengeeName;
        } else if($scope.user.id !== challenge.challengerId) {
          challenge.opponent = challenge.challengerName;
        } else {
          challenge.opponent = "Opponent";
        }
        if(challenge.challengeeCompleted && challenge.challengerCompleted) {
          if($scope.user.id === challenge.winnerId) {
            challenge.completedStatus = "You won this challenge!";
          } else if($scope.user.id === challenge.loserId) {
            challenge.completedStatus = "You lost this challenge.";
          }else {
            challenge.completedStatus = "Challenge still calculating.";
          }
        } else {
          challenge.completedStatus = "Waiting for other user to complete.";
        }
      });
    })
    .error(function(error) {
      alert(error);
    });

}]);