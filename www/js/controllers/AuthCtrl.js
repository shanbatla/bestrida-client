angular.module('auth', ['ngCordovaOauth'])

.controller('AuthCtrl', function($scope, $rootScope, $http, $location, $state, $cordovaOauth) {
    
    window.cordovaOauth = $cordovaOauth;
    window.http = $http;

    // $scope.data = {};
 
    $scope.login = function() {
      // console.log("username: " + $scope.data.username + " and password: " + $scope.data.password);
      
      //DONT USE ANYMORE
      // $cordovaOauth.strava(clientID, clientSecret, ['view_private']).then(function(result) {
      //   console.log("Response Object -> " + JSON.stringify(result));
      //   // $location.path('/challenge-feed');
      //   // $state.go('/challenge-feed');

      // }, function(error) {
      //   console.log(error);
      // });   s
      
      // Opens new in app window
      // var ref = window.open('http://bestrida.herokuapp.com/api/register', '_blank', 'location=yes');
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
              alert(response.data.athlete.id);
              alert(response.data.athlete.firstname);
              alert(response.data.athlete.lastname);
            }, function (error) {
              alert(error);
          });  
        }
      });


    }

})