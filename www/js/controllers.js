angular.module('starter.controllers', [])

.controller('ChallengeCtrl', function($scope) {
  //set up mock data for challenge-feed template
  $scope.challengers = mockChallengers;

})

.controller('ChatsCtrl', function($scope, ActiveChallenges) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.challengers = ActiveChallenges.all();
  $scope.remove = function(challenger) {
    ActiveChallenges.remove(challenger);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, ActiveChallenges) {
  $scope.challenger = ActiveChallenges.get($stateParams.challengerID);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('CreateCtrl', function($scope) {
  $scope.challengers = mockChallengers;
  $scope.segments = mockSegments;
})

.controller('CompletedCtrl', function($scope) {
  $scope.challengers = mockChallengers;
  $scope.segments = mockSegments;
})

.controller('ChallengeStatsCtrl', function($scope) {
  
});