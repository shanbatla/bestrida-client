angular.module('create', [])

.controller('CreateCtrl', function($scope) {
  $scope.challengers = mockChallengers;
  $scope.segments = mockSegments;
});