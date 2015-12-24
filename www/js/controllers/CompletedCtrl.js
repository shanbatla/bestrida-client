angular.module('completed', [])

.controller('CompletedCtrl', ['$scope','CompletedFct', 'AuthFct',function($scope, CompletedFct, AuthFct) {
  
  $scope.userId = AuthFct.userId;

  $scope.doRefresh = function() {
    CompletedFct.getCompletedChallenge($scope.userId)
    .success(function(data) {
      $scope.challenges = data;
      $scope.challenges.forEach(function(challenge) {
        if($scope.userId != challenge.challengeeId) {
          challenge.opponent = challenge.challengeeName;
        } else if($scope.userId != challenge.challengerId) {
          challenge.opponent = challenge.challengerName;
        } else {
          challenge.opponent = "Opponent";
        }
        if(challenge.challengeeCompleted && challenge.challengerCompleted) {
          if($scope.userId == challenge.winnerId) {
            challenge.completedStatus = "You won this challenge!";
          } else if($scope.userId == challenge.loserId) {
            challenge.completedStatus = "You lost this challenge.";
          }else {
            challenge.completedStatus = "Challenge might be calculating.";
          }
        } else {
          challenge.completedStatus = "Waiting for other user to complete.";
        }
      });
    })
    .finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    })
    .error(function(error) {
      alert(error);
    });
  };

  CompletedFct.getCompletedChallenge($scope.userId)
    .success(function(data) {
      $scope.challenges = data;
      $scope.challenges.forEach(function(challenge) {
        if($scope.userId != challenge.challengeeId) {
          challenge.opponent = challenge.challengeeName;
        } else if($scope.userId != challenge.challengerId) {
          challenge.opponent = challenge.challengerName;
        } else {
          challenge.opponent = "Opponent";
        }
        if(challenge.challengeeCompleted && challenge.challengerCompleted) {
          if($scope.userId == challenge.winnerId) {
            challenge.completedStatus = "You won this challenge!";
          } else if($scope.userId == challenge.loserId) {
            challenge.completedStatus = "You lost this challenge.";
          }else {
            challenge.completedStatus = "Challenge might be calculating.";
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