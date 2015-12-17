angular.module('auth', ['ngCordovaOauth'])

.controller('AuthCtrl', function($scope, $rootScope, $http, $location, $state, $cordovaOauth) {
    
    // window.cordovaOauth = $cordovaOauth;
    // window.http = $http;

    // $scope.data = {};
 
    $scope.login = function() {
      // console.log("username: " + $scope.data.username + " and password: " + $scope.data.password);
      
      var ref = window.open('https://www.strava.com/oauth/authorize?' + 'client_id=' + clientID + '&response_type=code' + '&redirect_uri=http://localhost/callback ', '_blank', 'location=yes');
      ref.addEventListener('loadstart', function(event) { 
        if((event.url).startsWith("http://localhost/callback")) {
          requestToken = (event.url).split("code=")[1];
          var code = (event.url).split("code=")[1];
          ref.close();
          $state.go('tab.challenge-feed');

          $http({
            method: 'POST',
            url: 'https://www.strava.com/oauth/token?' + 'client_id=' + clientID + '&client_secret=' + clientSecret + '&code=' + code
          })
            .then(function (response) {
              $rootScope.user = response.data;
            }, function (error) {
              alert(error);
          });  
        }
      });
    }

})