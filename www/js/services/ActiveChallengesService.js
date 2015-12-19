angular.module('activechallengesservice', [])


.factory('ActiveChallenges', function() {

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

  auth.login = function() {
      
      var ref = window.open('https://www.strava.com/oauth/authorize?' + 'client_id=' + clientID + '&response_type=code' + '&redirect_uri=http://localhost/callback ', '_blank', 'location=yes');
      ref.addEventListener('loadstart', function(event) { 
        if((event.url).startsWith("http://localhost/callback")) {
          requestToken = (event.url).split("code=")[1];
          var code = (event.url).split("code=")[1];
          ref.close();

          $http({
            method: 'POST',
            url: 'https://www.strava.com/oauth/token?' + 'client_id=' + clientID + '&client_secret=' + clientSecret + '&code=' + code
          })
            .then(function (response) {
              auth.user = response.data;
              $state.go('tab.challenge-feed');
              return user;
            }, function (error) {
              $state.go('login');
          });  
        }
      });
    };

    return auth;

}])

.factory('ActiveChallengesFct', ['$http', function($http) {

  return {
    getActiveChallenges: function(userId) {
      return $http.get('http://bestrida.herokuapp.com/api/challenges/active/' + userId);
    },
    removeActiveChallenge: function(activeChallenge, userId) {
      //this is the data format that the server is expecting
      var completeChallenge = {
        id: activeChallenge._id,
        //userId will need to reflect the logged in user's id - currently hardcoded for testing purposes
        userId: userId
      };
      // activeChallenges.splice(activeChallenges.indexOf(activeChallenge), 1);
      return $http.post('http://bestrida.herokuapp.com/api/challenges/complete', completeChallenge);
    }
  };
}]);
