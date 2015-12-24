angular.module('activechallengesservice', ['LocalStorageModule'])


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
        return $http.get('http://www.bestrida.co/api/challenges/pending/'+ userId);
      },
      getFriends: function(userId) {
        return $http.get('http://www.bestrida.co/api/friends/' + userId);
      },
      postAcceptChallenge: function(challenge) {
        return $http.post('http://www.bestrida.co/api/challenges/accept', challenge);
      },
      postDeclineChallenge: function(challenge) {
        return $http.post('http://www.bestrida.co/api/challenges/decline', challenge);
      }
    };
}])

.factory('CreateFct', ['$http', function($http) {
  return {
    createChallenge: function(data) {
      return $http.post('http://www.bestrida.co/api/challenges/create', data);
    },
    getUser: function(challengerId) {
      return $http.get('http://www.bestrida.co/api/users/' + challengerId);
    },
    getSegments: function() {
      return $http.get('http://www.bestrida.co/api/segments/');
    }
  };
}])

.factory('AuthFct', function ($window, $state, localStorageService, $location) {
  var url = 'http://bestrida.co/auth/strava';
  var loginWindow, token, hasToken, userId, hasUserId;
  var auth = {};
  auth.login = function () {
    loginWindow = $window.open(url, '_blank', 'location=no,toolbar=no');

    loginWindow.addEventListener('loadstart', function (event) {
      if((event.url).startsWith("http://www.bestrida.co/loggedIn.html")) {
        var token = event.url.match('oauth_token=(.*)&userId')[1];
        var userId = event.url.match('&userId=(.*)')[1];
        loginWindow.close();
        localStorageService.set('strava-token', token);
        localStorageService.set('token-date', JSON.stringify(new Date()));
        localStorageService.set('userId', userId);
        auth.userId = userId;
        auth.token = token;
      }
      $state.go('tab.account');
    });
  };
  return auth;
})

.factory('CompletedFct', ['$http', function($http) {

  return {
    getCompletedChallenge: function(userId) {
      return $http.get('http://www.bestrida.co/api/challenges/completed/' + userId);
    }
  };
}])

.factory('ActiveChallengesFct', ['$http', function($http) {

  return {
    getActiveChallenges: function(userId) {
      return $http.get('http://www.bestrida.co/api/challenges/active/' + userId);
    },
    removeActiveChallenge: function(activeChallenge, userId) {
      //this is the data format that the server is expecting
      var completeChallenge = {
        id: activeChallenge._id,
        //userId will need to reflect the logged in user's id - currently hardcoded for testing purposes
        userId: userId
      };
      // activeChallenges.splice(activeChallenges.indexOf(activeChallenge), 1);
      return $http.post('http://www.bestrida.co/api/challenges/complete', completeChallenge);
    }
  };
}]);
