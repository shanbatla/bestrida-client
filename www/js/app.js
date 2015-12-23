// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'activechallengesservice', 'challengers', 'activechallengesctrl', 'activedetail', 'pendingdetail', 'account', 'create', 'completed', 'challengestats', 'auth', 'ngCordovaOauth', 'ngCordova'])

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

  .state('tab.pending-detail', {
    url: '/pending-detail/:challengeId',
    views: {
      'challenge-feed': {
        templateUrl: 'templates/pending-detail.html',
        controller: 'PendingDetailCtrl'
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
    url: '/challenge-stats/:challengeId',
    views: {
      'completed-challenges': {
        templateUrl: 'templates/challenge-stats.html',
        controller: 'ChallengeStatsCtrl'
      }
    }
  })

  .state('tab.active-challenges', {
      url: '/active-challenges',
      views: {
        'active-challenges': {
          templateUrl: 'templates/active-challenges.html',
          controller: 'ActiveChallengesCtrl'
        }
      }
    })
    .state('tab.active-detail', {
      url: '/active-detail/:challengeId',
      views: {
        'active-challenges': {
          templateUrl: 'templates/active-detail.html',
          controller: 'ActiveDetailCtrl'
        }
      }
    })

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
  // $urlRouterProvider.otherwise('/tab/challenge-feed');

});