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
      
      $scope.segmentId = data.segmentId;

    })
    .error(function(data) {
      alert('error')
    });
  

  // Get segment and its info

}]);

