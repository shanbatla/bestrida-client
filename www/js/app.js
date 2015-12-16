// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'activechallengesservice', 'challengers', 'activechallengesctrl', 'tailofthetape', 'account', 'create', 'completed', 'challengestats', 'auth', 'ngCordovaOauth', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
 
 //Login state 
 .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'AuthCtrl'
  })

  // setup an abstract state for the tabs directive

    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:


  .state('tab.challenge-feed', {
    url: '/challenge-feed',
    views: {
      'challenge-feed': {
        templateUrl: 'templates/challenge-feed.html',
        controller: 'ChallengeCtrl'
      }
    }
  })

  // set up create challenge state
  .state('tab.create-challenge', {
    url: '/create-challenge',
    views: {
      'create-challenge': {
        templateUrl: 'templates/create-challenge.html',
        controller: 'CreateCtrl'
      }
    }
  })

  // set up completed challenge state and challenge stats state
  .state('tab.completed-challenges', {
    url: '/completed-challenges',
    views: {
      'completed-challenges': {
        templateUrl: 'templates/completed-challenges.html',
        controller: 'CompletedCtrl'
      }
    }
  })
  .state('tab.challenge-stats', {
    url: '/challenge-stats',
    views: {
      'completed-challenges': {
        templateUrl: 'templates/challenge-stats.html',
        controller: 'ChallengeStatsCtrl'
      }
    }
  })

  .state('tab.active-challenges', {
  // .state('tab.chats', {
      url: '/active-challenges',
      views: {
        'active-challenges': {
          templateUrl: 'templates/active-challenges.html',
          controller: 'ActiveChallengesCtrl'
        }
      }
    })
    // .state('tab.chat-detail', {
    //   url: '/chats/:challengeId',
    //   views: {
    //     'tab-chats': {
    //       templateUrl: 'templates/chat-detail.html',
    //       controller: 'TailofTheTapeCtrl'
    //     }
    //   }
    // })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});


//Mock Data
var mockChallengers = [
    {
      challengeeId: 0, 
      name: "AJ Mullins", 
      segment: "X",
      face: 'img/strava_profile_pic.png',
      result: "won",
      count: 2
    },
    {
      challengeeId: 1, 
      name: "Dave Lee", 
      segment: "Y",
      face: 'img/strava_profile_pic.png',
      result: "lost",
      count: 1
    },
    {
      challengeeId: 2, 
      name: "Justin Zimmerman", 
      segment: "Z",
      face: 'img/strava_profile_pic.png',
      result: "won",
      count: 8
    },
    {
      challengeeId: 3, 
      name: "Shan Batla", 
      segment: "A",
      face: 'img/strava_profile_pic.png',
      result: "lost",
      count: 4
    },
    {
      challengeeId: 4, 
      name: "Nick Balestra", 
      segment: "B",
      face: 'img/strava_profile_pic.png', 
      result: "won",
      count: 15
    }
  ];

var mockSegments = [
    {
      segmentId: 0, 
      segmentName: "Walnut Creek Main St",
      count: 5
    },
    {
      segmentId: 1, 
      segmentName: "Memory Grove Sprint",
      count: 25
    },
    {
      segmentId: 2,
      segmentName: "Western Port Wall",
      count: 10
    },
    {
      segmentId: 3,
      segmentName: "Cactus Run Downhill",
      count: 15
    },
    {
      segmentId: 4, 
      segmentName: "Mustard Run",
      count: 1
    }
  ];

