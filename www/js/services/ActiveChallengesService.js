angular.module('activechallengesservice', [])

.factory('ActiveChallenges', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var challengers = mockChallengers;

  return {
    all: function() {
      return challengers;
    },
    remove: function(challenger) {
      challengers.splice(challengers.indexOf(challenger), 1);
    },
    get: function(challengerID) {
      for (var i = 0; i < challengers.length; i++) {
        if (challengers[i].id === parseInt(challengerID)) {
          return challengers[i];
        }
      }
      return null;
    }
  };
})

.factory('FeedFct', ['$http', function($http) {
    return {
      pendingChallenge: function(userId) {
        return $http.get('http://bestrida.herokuapp.com/api/challenges/pending/'+ userId);
      },
      getUser: function(challengeeId) {
        return $http.get('http://bestrida.herokuapp.com/api/users/' + challengeeId);
      },
      getSegments: function(segmentId) {
        return $http.get('http://bestrida.herokuapp.com/api/segments/' + segmentId);
      },
      postAcceptChallenge: function(challenge) {
        return $http.post('http://bestrida.herokuapp.com/api/challenges/accept', challenge);
      },
      postDeclineChallenge: function(challenge) {
        return $http.post('http://bestrida.herokuapp.com/api/challenges/decline', challenge);
      }
    };
}])

.factory('CreateFct', ['$http', function($http) {
  return {
    createChallenge: function(data) {
      return $http.post('http://bestrida.herokuapp.com/api/challenges/create', data);
    },
    getUser: function(challengerId) {
      return $http.get('http://bestrida.herokuapp.com/api/users/' + challengerId);
    },
    getSegments: function() {
      return $http.get('http://bestrida.herokuapp.com/api/segments/');
    }
  };
}])

.factory('AuthFct', ['$http', '$location', '$state', '$cordovaOauth', function($http, $location, $state, $cordovaOauth) {
  var auth = {};
  alert(auth);

  auth.login = function() {
      console.log('inside auth factory login');
      
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
              auth.user = response.data;
              alert(user.athlete.id);
              return user;
            }, function (error) {
              alert(error);
          });  
        }
      });
    }

    return auth;

}]);
