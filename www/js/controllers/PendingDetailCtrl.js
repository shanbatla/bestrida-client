angular.module('pendingdetail', [])

.controller('PendingDetailCtrl', ['$scope', '$stateParams', 'ChallengeStatsFct', 'PendingDetailFct', 'FeedFct', 'localStorageService', function($scope, $stateParams, ChallengeStatsFct, PendingDetailFct, FeedFct, localStorageService) {
 
  // Get challenge id, then get challenge object
  var challengeId = $stateParams.challengeId;
  $scope.userId = localStorageService.get('userId');
  
  //Ping API, get challenge
  ChallengeStatsFct.getChallenge(challengeId)
    .success(function(data) {
      $scope.challenge = data;
      var segment = data.segmentId;

    // Get segment and its info
    PendingDetailFct.getSegment(segment)
      .success(function(data) {
        
        $scope.segmentName = data.name;
        $scope.distanceInMiles = data.distance / 1609.34;
        $scope.city = data.city;
        $scope.state = data.state;
        $scope.activityType = data.activityType;
        $scope.averageGrade = data.averageGrade || 'Not Provided';
        $scope.climbCategory = data.climbCategory || 'Not Provided';
        $scope.totalElevationGain = data.totalElevationGain || 'Not Provided';

      })
      .error(function(data) {
        console.log('error');
      });

    })
    .error(function(data) {
      console.log('error');
    });

    $scope.declineChallenge = function(challenge) {
      var data = {
        id: challenge._id
      };
      FeedFct.postDeclineChallenge(data);
    };

}]);