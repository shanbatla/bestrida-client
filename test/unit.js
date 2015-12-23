// describe('Controllers', function(){
//     var scope;

//     // load the controller's module
//     beforeEach(module('starter.controllers'));

//     beforeEach(inject(function($rootScope, $controller) {
//         scope = $rootScope.$new();
//         $controller('AccountCtrl', {$scope: scope});
//     }));

//     // tests start here
//     it('should have enabled friends to be true', function(){
//         expect(scope.settings.enableFriends).toEqual(true);
//     });
// });

// describe('AuthCtrl', function(){
//     var scope;

//     // load the controller's module
//     beforeEach(module('auth'));

//     beforeEach(inject(function($rootScope, $controller) {
//         scope = $rootScope.$new();
//         $controller('AuthCtrl', {$scope: scope});
//     }));

//     // tests start here
//     it('should have login function', function(){
//         expect(scope.login).to.be.a('function');
//     });
// });


// describe('AuthCtrl', function() {
//   beforeEach(module('app'));

//   var $AuthCtrl;

//   beforeEach(inject(function(_$AuthCtrl_){
//     // The injector unwraps the underscores (_) from around the parameter names when matching
//     $AuthCtrl = _$AuthCtrl_;
//   }));

//   describe('$scope', function() {
//     it('is an object', function() {
//       expect($scope).to.be.a('object');
//     });
//   });

//   describe('$scope.login', function() {
//     it('is a function', function() {
//       expect($scope.login).to.be.a('function');
//     });
//   });
// });


// describe('Auth Controller', function() {
//   beforeEach(module('starter', ['ionic', 'activechallengesservice', 'challengers', 'activechallengesctrl', 'tailofthetape', 'account', 'create', 'completed', 'challengestats', 'auth', 'ngCordovaOauth', 'ngCordova']));

//   var $controller;

//   beforeEach(inject(function(_$controller_){
//     // The injector unwraps the underscores (_) from around the parameter names when matching
//     $controller = _$controller_;
//   }));

//   describe('$scope.login', function() {
//     it('should be a function', function() {
//       expect($scope.login).to.be.a('function');
//     });

//   });
// });


describe('Account Controller', function(){
  var scope;

  // load the controller's module
  beforeEach(module('account'));

  beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      $controller('AccountCtrl', {$scope: scope});
  }));

  // tests start here
  it('should have enabled friends to be true', function(){
      expect(scope.settings.enableFriends).toEqual(true);
  });
})

// describe('Auth Controller', function(){
//   var scope;

//   // load the controller's module
//   beforeEach(module('auth', ['ngCordovaOauth']));

//   beforeEach(inject(function($rootScope, $controller) {
//       scope = $rootScope.$new();
//       $controller('AuthCtrl', {$scope: scope});
//   }));

//   // tests start here
//   it('should have a defined function called login', function(){
//       expect(scope.login).toBeDefined();
//   });
// })

