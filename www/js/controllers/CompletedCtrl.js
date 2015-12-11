angular.module('completed', [])

.controller('CompletedCtrl', function($scope) {
  $scope.challengers = mockChallengers;
  $scope.segments = mockSegments;
});