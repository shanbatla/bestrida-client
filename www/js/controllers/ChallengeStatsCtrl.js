angular.module('challengestats', [])

.controller('ChallengeStatsCtrl', ['$scope', '$stateParams', 'CompletedFct', 'AuthFct', 'CreateFct', 'ChallengeStatsFct', function($scope, $stateParams, CompletedFct, AuthFct, CreateFct, ChallengeStatsFct) {

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


  //Get user id 
  $scope.userId = AuthFct.userId;

  // Get user name
  CreateFct.getUser($scope.userId)
    .success(function(data) {
      $scope.userName = data.fullName;
    });

  //Get challengeId from state url
  $scope.challengeId = $stateParams.challengeId;

  //Ping API, get challenge
  ChallengeStatsFct.getChallenge($scope.challengeId)
    .success(function(data) {
      
      $scope.challenge = data;
      var challenge = data;

      //Identify who is the user is the challenger or challengee
      if ($scope.userId == challenge.challengerId) {
        
        // Declare opponent - challenge.challengerId is user, challenge.challengeeId is opponent
        $scope.opponent = challenge.challengeeName;
        
        // Declare opponent time
        var readableOpponentTime = secondsToTime(challenge.challengeeTime);
        $scope.opponentTime = readableOpponentTime;

        // Declare user time
        var readableUserTime = secondsToTime(challenge.challengerTime);
        $scope.userTime = readableUserTime;

      } else if ($scope.userId == challenge.challengeeId) {
        
        // Declare opponent - challenge.challengeeId is user, challenge.challengerId is opponent
        $scope.opponent = challenge.challengerName;
        
        // Declare opponent time
        var readableOpponentTime = secondsToTime(challenge.challengerTime);
        $scope.opponentTime = readableOpponentTime;

        //Declare user time
        var readableUserTime = secondsToTime(challenge.challengeeTime);
        $scope.userTime = readableUserTime;

      } 

      //Declare winner
      if ($scope.userTime < $scope.opponentTime) {
        $scope.challengeResult = "Won";
      } else {
        $scope.challengeResult = "Lost";
      }

      //Declare status
      if (challenge.status === "complete") {
        $scope.challengeStatus = true;
      } else {
        $scope.challengeStatus = false;
      }
  
      //Declare segment
      $scope.segment = challenge.segmentName;

      //Declare distance
      var distanceInMeters = challenge.segmentDistance;
      var distanceInMiles = distanceInMeters / 1609.34;
      $scope.distance = distanceInMiles;
      
    })
    .error(function(data) {
      alert('error')
    });
  
}]);