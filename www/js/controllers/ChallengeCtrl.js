angular.module('challengers', [])

.controller('ChallengeCtrl', ['$scope','$rootScope','$http', 'FeedFct',
  function($scope, $rootScope, $http, FeedFct) {


  var challenge = {
    challengeeId: 6274388,
    segmentId: 10663090,
    segmentName: 'Walnut Creek Main St',
    id: '566f7b01ff2af20300dcc959'
  };

  FeedFct.pendingChallenge(challenge.challengeeId)
    .success(function(data) {
      $scope.challengers = data;
      console.log(data);
    })
    .error(function(error) {
      alert(error);
    });

  FeedFct.getUser(challenge.challengeeId)
    .success(function(data) {
      $scope.users = data;
      console.log(data);
    })
    .error(function(error) {
      alert(error);
    });

  FeedFct.getSegments(challenge.segmentId)
    .success(function(data) {
      $scope.segments = data;
      console.log(data);
    })
    .error(function(error) {
      alert(error);
    });

  $scope.acceptChallenge = function(challenge) {
    var data = {
      id: challenge.id
    };
    FeedFct.acceptChallenge(data);
  };

  $scope.declineChallenge = function(challenge) {
    var data = {
      id: challenge.id
    };
    FeedFct.declineChallenge(data);
  };

}]);