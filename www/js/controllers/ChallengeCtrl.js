angular.module('challengers', [])

.controller('ChallengeCtrl', ['$scope', 'FeedFct', 'AuthFct', function($scope, FeedFct, AuthFct) {

  $scope.user = AuthFct.user.athlete;

  $scope.doRefresh = function() {
    FeedFct.pendingChallenge($scope.user.id)
    .success(function(data) {
      $scope.challenges = data;
    })
    .finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  FeedFct.pendingChallenge($scope.user.id)
    .success(function(data) {
      $scope.challenges = data;
    });
    // TODO: error takes too long to display -> Option: replace with logic that will check the length of our data array and display a different line item if the length is 0
    // .error(function(error) {
    //   alert("Looks like you're fresh out of pending challenges. Get to work and challenge a friend!");
    // })

  $scope.acceptChallenge = function(challenge) {
    var data = {
      id: challenge._id
    };
    alert("You've accepted this challenge!");
    FeedFct.postAcceptChallenge(data);
  };

  $scope.declineChallenge = function(challenge) {
    var data = {
      id: challenge._id
    };
    alert("You've declined this challenge...");
    FeedFct.postDeclineChallenge(data);
  };

}]);