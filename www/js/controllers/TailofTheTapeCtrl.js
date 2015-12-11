angular.module('tailofthetape', [])

.controller('TailofTheTapeCtrl', function($scope, $stateParams, ActiveChallenges) {
  $scope.challenger = ActiveChallenges.get($stateParams.challengerID);
  console.log("tale of the tape ctrl");
});