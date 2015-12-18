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
    getUsers: function() {
      return $http.get('http://bestrida.herokuapp.com/api/users/');
    },
    getSegments: function() {
      return $http.get('http://bestrida.herokuapp.com/api/segments/');
    }
  };
}]);
