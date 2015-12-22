
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

describe('AuthCtrl', function() {
  beforeEach(module('app'));

  var $AuthCtrl;

  beforeEach(inject(function(_$AuthCtrl_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $AuthCtrl = _$AuthCtrl_;
  }));

  describe('$scope.login', function() {
    it('is a function', function() {
      expect($scope.login).to.be.a('function');
    });
  });
});