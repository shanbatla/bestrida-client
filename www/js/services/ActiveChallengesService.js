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
        return $http.get('http://bestrida.co/api/challenges/pending/'+ userId);
      },
      getFriends: function(userId) {
        return $http.get('http://bestrida.co/api/friends/' + userId);
      },
      postAcceptChallenge: function(challenge) {
        return $http.post('http://bestrida.co/api/challenges/accept', challenge);
      },
      postDeclineChallenge: function(challenge) {
        return $http.post('http://bestrida.co/api/challenges/decline', challenge);
      }
    };
}])

.factory('CreateFct', ['$http', function($http) {
  return {
    createChallenge: function(data) {
      return $http.post('http://bestrida.co/api/challenges/create', data);
    },
    getUser: function(challengerId) {
      return $http.get('http://bestrida.co/api/users/' + challengerId);
    },
    getSegments: function() {
      return $http.get('http://bestrida.co/api/segments/');
    }
  };
}])

// .factory('AuthFct', ['$http', '$location', '$state', '$cordovaOauth', function($http, $location, $state, $cordovaOauth) {
//   var auth = {};

//   auth.login = function() {
      
//       var ref = window.open('http://bestrida.co/api/register', '_blank', 'location=no,toolbar=no');
//       ref.addEventListener('loadstart', function(event) { 
//         if((event.url).startsWith("http://bestrida.co/api/registercode")) {
//           requestToken = (event.url).split("code=")[1];
//           var code = (event.url).split("code=")[1];
//           ref.close();

//           $http({
//             method: 'POST',
//             url: 'https://www.strava.com/oauth/token?' + 'client_id=' + clientID + '&client_secret=' + clientSecret + '&code=' + code
//           })
//             .then(function (response) {
//               auth.user = response.data;
//               $state.go('tab.challenge-feed');
//               return user;
//             }, function (error) {
//               $state.go('login');
//           });  
//         }
//       });
//     };

//     return auth;

// }])

///////////////////////////////////////////////
.factory('AuthFct', function ($window, $state, $ionicLoading, localStorageService, $location) {
  var url = 'http://bestrida.co/auth/strava';
  var loginWindow, token, hasToken, userId, hasUserId;
  var auth = {};
  auth.login = function () {
    loginWindow = $window.open(url, '_blank', 'location=no,toolbar=no');
    $ionicLoading.show({
       template: '<p>Contacting Strava...</p><i class="icon ion-loading-c"></i>',
       animation: 'fade-in',
       showBackdrop: false,
       maxWidth: 200,
       showDelay: 200
    });
    loginWindow.addEventListener("loadstop", function(e) {
        $ionicLoading.hide();
        loginWindow.show();
    });
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
//////////////////////////////////////////////

.factory('CompletedFct', ['$http', function($http) {

  return {
    getCompletedChallenge: function(userId) {
      return $http.get('http://bestrida.co/api/challenges/completed/' + userId);
    }
  };
}])

.factory('ActiveChallengesFct', ['$http', function($http) {

  return {
    getActiveChallenges: function(userId) {
      return $http.get('http://bestrida.co/api/challenges/active/' + userId);
    },
    removeActiveChallenge: function(activeChallenge, userId) {
      //this is the data format that the server is expecting
      var completeChallenge = {
        id: activeChallenge._id,
        //userId will need to reflect the logged in user's id - currently hardcoded for testing purposes
        userId: userId
      };
      // activeChallenges.splice(activeChallenges.indexOf(activeChallenge), 1);
      return $http.post('http://bestrida.co/api/challenges/complete', completeChallenge);
    }
  };
}]);
