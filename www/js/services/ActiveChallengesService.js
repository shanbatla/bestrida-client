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
      }
    }
}]);
