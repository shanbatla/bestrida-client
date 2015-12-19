angular.module('challengers', [])

.controller('ChallengeCtrl', ['$scope', 'FeedFct', 'AuthFct', function($scope, FeedFct, AuthFct) {

  $scope.user = AuthFct.user.athlete;

  FeedFct.pendingChallenge($scope.user.id)
    .success(function(data) {
      $scope.challenges = data;
    })
    .error(function(error) {
      alert("Looks like you're fresh out of pending challenges. Get to work and challenge a friend!");
    })

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