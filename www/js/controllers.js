angular.module('starter.controllers', [])

.controller('ChallengeCtrl', function($scope, $http) {
  //set up mock data for challenge-feed template
  $scope.challengers = mockChallengers;

  //Ajax request - test
  //url for users that have signed in - http://bestrida.herokuapp.com/api/users
  
  $http({
    method: 'GET',
    url: 'http://bestrida.herokuapp.com/api/users'
      }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(response);
      }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log('error')
  });


})

.controller('ChatsCtrl', function($scope, ActiveChallenges) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = ActiveChallenges.all();
  $scope.remove = function(chat) {
    ActiveChallenges.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, ActiveChallenges) {
  $scope.chat = ActiveChallenges.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('CreateCtrl', function($scope) {
  $scope.challengers = mockChallengers;
  $scope.segments = mockSegments;
})

.controller('CompletedCtrl', function($scope) {
  $scope.challengers = mockChallengers;
  $scope.segments = mockSegments;
})

.controller('ChallengeStatsCtrl', function($scope) {
});



// Data format for Ajax request to user API
// [
  //{
    // "_id":2711071,
    // "firstname":"David",
    // "lastname":"Lee",
    // "token":"6040bda80f9dae9ca087fb5bb1a021c797e7636b",
    // "photo":"https://dgalywyr863hv.cloudfront.net/pictures/athletes/2711071/3710377/1/large.jpg",
    // "email":"david7lee@gmail.com",
    // "__v":0
  // },
//]






