angular.module('pendingdetail', [])

.controller('PendingDetailCtrl', ['$scope', '$stateParams', 'ChallengeStatsFct', 'PendingDetailFct', function($scope, $stateParams, ChallengeStatsFct, PendingDetailFct) {
  // Define:
    // name of segment 
    // distance
    // city 
    // state
    // activity type
    // avg grade 
    // climb category


  // Get challenge id, then get challenge object
  var challengeId = $stateParams.challengeId;
  
  //Ping API, get challenge
  ChallengeStatsFct.getChallenge(challengeId)
    .success(function(data) {
      
    var segment = data.segmentId;

    // Get segment and its info
    PendingDetailFct.getSegment(segment)
      .success(function(data) {
        
        $scope.segmentDetail = data;

      })
      .error(function(data) {
        alert('error - PendingDetailFct')
      });

    })
    .error(function(data) {
      alert('error - ChallengeStatsFct')
    });

}]);