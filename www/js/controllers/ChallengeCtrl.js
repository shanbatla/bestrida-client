angular.module('challengers', [])

.controller('ChallengeCtrl', ['$scope', 'FeedFct', 'AuthFct', function($scope, FeedFct, AuthFct) {
  // Save current users information
  $scope.userId = AuthFct.userId;
  $scope.photo = {};

  // Update pending challenges when the user pulls down to refresh
  $scope.doRefresh = function() {
    FeedFct.pendingChallenge($scope.userId)
    .success(function(data) {
      $scope.challenges = data;
    })
    .finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  // Save current users pending challenges
  FeedFct.pendingChallenge($scope.userId)
    .success(function(data) {
      $scope.challenges = data;
    });

  // Save current users friends photo to display
  // NOTE: This is costly in terms of time to make the API call and the iterate through the friends array. Might make more sense to store this as part of all challenges instead so we only have to make 1 API call?
  FeedFct.getFriends($scope.userId)
    .success(function(data) {
      data.forEach(function(friend) {
        $scope.photo[friend.id] = friend.photo;
      });
    });
 
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