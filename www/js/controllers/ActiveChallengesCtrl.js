angular.module('activechallengesctrl', [])

.controller('ActiveChallengesCtrl', function($scope, ActiveChallenges, ActiveChallengesFct) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  ActiveChallengesFct.getActiveChallenges()
    .success(function(data) {
      $scope.activeChallenges = data;
    });
  
  // $scope.activeChallenges = ActiveChallenges.all();
  $scope.removeActiveChallenge = function(activeChallenge) {
    ActiveChallengesFct.removeActiveChallenge(activeChallenge);
  };

  //Old Code
  // $scope.challengers = ActiveChallenges.all();
  // $scope.remove = function(challenger) {
  //   ActiveChallenges.remove(challenger);
  // };

});

// data from server
// [
//   {
//     "_id":"566f63a5bb602d030004c8c5",
//     "segmentId":0,
//     "segmentName":"Walnut Creek Main St",
//     "challengerId":6274388,
//     "challengeeId":1027935,
//     "challengerName":"Ash Ketchum",
//     "challengeeName":"Gary Oak",
//     "__v":0,
//     "created":"2015-12-15T00:49:41.037Z",
//     "status":"active"
//   }
// ]