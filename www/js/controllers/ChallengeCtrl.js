angular.module('challengers', [])

.controller('ChallengeCtrl', ['$scope', 'FeedFct', 'AuthFct', function($scope, FeedFct, AuthFct) {

  $scope.user = AuthFct.user.athlete;

  FeedFct.pendingChallenge($scope.user.id)
    .success(function(data) {
      $scope.challenges = data;
    })
    .error(function(error) {
      alert(error);
    });

  $scope.acceptChallenge = function(challenge) {
    alert("No backing out now!");
    var data = {
      id: challenge.id
    };
    // TODO: Build out button functionality
    // FeedFct.acceptChallenge(data);
  };

  $scope.declineChallenge = function(challenge) {
    alert("Maybe next time!");
    var data = {
      id: challenge.id
    };
    // TODO: Build out button functionality
    // FeedFct.declineChallenge(data);
  };

}]);