angular.module('pendingdetail', [])

.controller('PendingDetailCtrl', ['$scope', '$stateParams', 'ChallengeStatsFct', 'PendingDetailFct', function($scope, $stateParams, ChallengeStatsFct, PendingDetailFct) {
 
  // Get challenge id, then get challenge object
  var challengeId = $stateParams.challengeId;
  
  //Ping API, get challenge
  ChallengeStatsFct.getChallenge(challengeId)
    .success(function(data) {
      
    var segment = data.segmentId;

    // Get segment and its info
    PendingDetailFct.getSegment(segment)
      .success(function(data) {
        
        $scope.segmentName = data.name;
        $scope.distanceInMiles = data.distance / 1609.34;
        $scope.city = data.city;
        $scope.state = data.state;
        $scope.activityType = data.activityType;
        $scope.averageGrade = data.averageGrade;
        $scope.climbCategory = data.climbCategory;

      })
      .error(function(data) {
        alert('error')
      });

    })
    .error(function(data) {
      alert('error')
    });

}]);