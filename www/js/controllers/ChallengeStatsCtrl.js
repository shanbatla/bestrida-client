angular.module('challengestats', [])

.controller('ChallengeStatsCtrl', ['$scope', '$stateParams', 'CompletedFct', 'AuthFct', 'CreateFct', function($scope, $stateParams, CompletedFct, AuthFct, CreateFct) {

  //Get user id 
  $scope.userId = AuthFct.userId;

  // Get user name
  CreateFct.getUser($scope.userId)
    .success(function(data) {
      $scope.userName = data.fullName;
    });

  //Get challengeId from state url
  $scope.challengeId = $stateParams.challengeId;
  
  //Get challenges, iterate through challenges, pick the one that matches the stateParam from above
  CompletedFct.getCompletedChallenge($scope.userId)
    .success(function(data) {
      $scope.challenges = data;
      $scope.challenges.forEach(function(challenge) {
        if ($scope.challengeId === challenge._id) {
          
          //Declare opponent
          $scope.opponent = challenge.challengeeName;
          
          //Declare segment
          $scope.segment = challenge.segmentName;
          
          //Declare distance
          var distanceInMeters = challenge.segmentDistance;
          var distanceInMiles = distanceInMeters/1609.34
          $scope.distance = distanceInMiles;
          
          //Declare time for user and opponent, then declare winner
          //Use this function to convert seconds in human-readable time
          function secondsToTime(secs) {
            secs = Math.round(secs);
            var hours = Math.floor(secs / (60 * 60));

            var divisor_for_minutes = secs % (60 * 60);
            var minutes = Math.floor(divisor_for_minutes / 60);

            var divisor_for_seconds = divisor_for_minutes % 60;
            var seconds = Math.ceil(divisor_for_seconds);

            var obj = {
              "hours": hours,
              "minutes": minutes,
              "seconds": seconds
            };

            var hourString = obj.hours < 10 ? '0' + (obj.hours).toString() : (obj.hours).toString();
            var minuteString = obj.minutes < 10 ? '0' + (obj.minutes).toString() : (obj.minutes).toString();
            var secondString = obj.seconds < 10 ? '0' + (obj.seconds).toString() : (obj.seconds).toString();

            return hourString + ':' + minuteString + ':' + secondString;
          }

          $scope.userTime = challenge.challengerTime;
          $scope.opponentTime = challenge.challengeeTime;
          if ($scope.userTime < $scope.opponentTime) {
            $scope.challengeResult = "Won";
          } else {
            $scope.challengeResult = "Lost";
          }

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


