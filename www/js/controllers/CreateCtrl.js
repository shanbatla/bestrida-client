angular.module('create', [])

.controller('CreateCtrl', ['$scope', '$http', 'CreateFct', function($scope, $http, CreateFct) {

  // Load registered user data when navigating to the create challenge page
    // NOTE: This currently displays all registered users - consider displaying friends and followers of current user instead
  CreateFct.getUsers()
    .success(function(data) {
      $scope.challengers = data;
    });

  // Load segment data when navigating to the create challenge page
    // NOTE: This currently displays all segments for every registered user - consider displaying segments of only the current user instead
  CreateFct.getSegments()
    .success(function(data) {
      $scope.segments = data;
    })

  
  // Create Challenge - Triggered when 'create challenge' button is clicked
    // creates data object from user input and then calls factory create method where the post reqeust lives
  $scope.createChallenge = function() {
    var data = {
      segmentId: $scope.segment._id,
      segmentName: $scope.segment.name,
      // TODO: Figure out how to pull the challengerId - currently hard coded
      challengerId: 6274388,
      challengerName: 'AJ Mullins',
      challengeeId: $scope.challenger._id,
      challengeeName: $scope.challenger.fullName,
      completionDate: $scope.date
    }
    console.log(data);
    CreateFct.createChallenge(data);
  }

}])

.directive('ionSelect', function() {
  'use strict';
  return{
    restrict: 'EAC',
    scope: {
      label:'@',
      labelField:'@',
      labelField1: '@',
      provider:'=',
      ngModel: '=?',
      ngValue: '=?',
    },
    require: '?ngModel',
    transclude : false,
    replace: false,
    // NOTE: input controller if directive is decoupled into separate folder
    // NOTE: consider refactoring template with templateURL -> templateUrl: 'templates/create-challenge.html',
    template:
      // Template for input field and dropdown
      // '<span class="input-label">{{label}}</span>'
      '<div class="item item-input-inset">'
        +'<label class="item-input-wrapper">'
          +'<i class="icon ion-search placeholder-icon"></i>'
          +'<input id="filter" type="search"  ng-model="ngModel" ng-value="ngValue" ng-keydown="onKeyDown()" required />'
        +'</label>'
        +'<button class="button button-small button-clear" ng-model="ngModel" ng-click="open()">'
          +'<i class="icon ion-chevron-down"></i>'
        +'</button>'
      +'</div>'
      // Template that is displayed when dropdown button is clicked
      +'<div class="optionList padding-left padding-right" ng-hide="showHides">'
        // +'<ion-scroll>'
          +'<ul class="list">'
            +'<li class="item" ng-click="select(item)" ng-repeat="item in provider | orderBy: labelField1 | limitTo:3">{{item[labelField]}}</li>'
          +'</ul>'
        // +'</ion-scroll>'
      +'</div>'
      // Template that is displayed when input field is typed in 
      +'<div class="optionList padding-left padding-right" ng-show="showHide">'
        // +'<ion-scroll>'
          +'<ul class="list">'
            +'<li class="item" ng-click="select(item)" ng-repeat="item in provider | filter:ngModel">{{item[labelField]}}</li>'
          +'</ul>'
        // +'</ion-scroll>'
      +'</div>',

    link: function (scope, element, attrs, ngModel) {
      scope.ngValue = scope.ngValue !== undefined ? scope.ngValue :'item';

      scope.select = function(item){
        ngModel.$setViewValue(item);
        scope.showHide = false;
        scope.showHides = true;
      };
            
      element.bind('click',function(){
        element.find('input').triggerHandler('focus');
      });
            
      scope.open = function(){
        // NOTE: investigate what scope.ngModel is used for here - it is unclear
        scope.showHide = false;
        scope.ngModel = "";  
        return scope.showHides=!scope.showHides;
        // return scope.showHide=!scope.showHide;
      };
            
      scope.onKeyDown = function(){
        scope.showHides = true;
        scope.showHide = true;
        if(!scope.ngModel){
          scope.showHide = false;
        }
      }
            
      scope.$watch('ngModel',function(newValue){
        if(newValue)
      element.find('input').val(newValue[scope.labelField]);
      });
    },
  };
});