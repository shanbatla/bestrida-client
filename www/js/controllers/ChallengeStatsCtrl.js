angular.module('challengestats', [])

.controller('ChallengeStatsCtrl', ['$scope', '$stateParams', 'CompletedFct', 'AuthFct', 'CreateFct', function($scope, $stateParams, CompletedFct, AuthFct, CreateFct) {

  //Need segment name
  //Need distance for segment - don't have it
  //Who won
  //User, and their time
  //Opponenet, and their time

  //Get challenge id 
  $scope.userId = AuthFct.userId;

  // Get user name
  CreateFct.getUser($scope.userId)
    .success(function(data) {
      $scope.userName = data.fullName;
    });

  //Get challengeId
  $scope.challengeId = $stateParams.challengeId;
  
  //Get challenges
  CompletedFct.getCompletedChallenge($scope.userId)
    .success(function(data) {
      $scope.challenges = data;
      $scope.challenges.forEach(function(challenge) {
        //alert both variables below
        if ($scope.challengeId === challenge._id) {
          $scope.opponent = challenge.challengeeName;
        }
      })
    })
    .error(function(error) {
      alert('error');
    });

}]);


//Challenge object
  //does not have time
  //don't have distance of segment
// { _id: '5675914fa878868b3398bd3f',
//   segmentId: 1,
//   segmentName: 'Tour de France',
//   challengerId: 12348243,
//   challengerName: 'Green Teletubbie',
//   challengeeId: 2711071,
//   challengeeName: 'Red Teletubbie',
//   expires: '2015-12-25T23:27:00.000Z',
//   __v: 0,
//   loserName: 'Carly Fiorina',
//   loserId: 2711071,
//   winnerName: 'Donald Trump',
//   winnerId: 12348243,
//   challengeeTime: 571,
//   challengeeAvgCadence: 15,
//   challengeeAvgWatts: 55,
//   challengeeAvgHeartrate: 95,
//   challengeeMaxHeartRate: 110,
//   challengerTime: 579,
//   challengerAvgCadence: 10,
//   challengerAvgWatts: 50,
//   challengerAvgHeartrate: 100,
//   challengerMaxHeartRate: 125,
//   segmentCountry: 'Some Country',
//   segmentCity: 'Some City',
//   segmentDistance: 100,
//   segmentElevationGain: 9,
//   segmentAverageGrade: 5,
//   segmentClimbCategory: 3,
//   created: '2015-12-19T17:18:07.521Z',
//   status: 'complete',
//   challengeeCompleted: true,
//   challengerCompleted: true }


