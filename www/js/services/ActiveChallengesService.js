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
  }
}])

.factory('ActiveChallengesFct', ['$http', function($http) {

  return {
    getActiveChallenges: function() {
      //currently getting the challenges for user 6274388
      var userId = 6274388;
      return $http.get('http://bestrida.herokuapp.com/api/challenges/active/' + userId);
    },
    removeActiveChallenge: function(activeChallenge) {
      //this is the data format that the server is expecting
      var completeChallenge = {
        id: activeChallenge._id,
        //userId will need to reflect the logged in user's id - currently hardcoded for testing purposes
        userId: 6274388
      };
      // activeChallenges.splice(activeChallenges.indexOf(activeChallenge), 1);
      return $http.post('http://bestrida.herokuapp.com/api/challenges/complete', completeChallenge);
    }
  }
}]);




