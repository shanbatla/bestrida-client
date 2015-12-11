angular.module('challengers', [])

.controller('ChallengeCtrl', function($scope) {
  //set up mock data for challenge-feed template
  $scope.challengers = mockChallengers;
});