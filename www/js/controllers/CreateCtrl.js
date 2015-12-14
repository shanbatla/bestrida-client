angular.module('create', [])

.controller('CreateCtrl', ['$scope', function($scope) {
  $scope.challengers = mockChallengers;
  $scope.segments = mockSegments;

  // DELETE BELOW BEFORE DEPLOYING-> FOR TESTING PURPOSES
  $scope.test = function() {
    alert('Challenge successfully created')
    // alert($scope.challenger.name);
  }
  // DELETE ABOVE BEFORE DEPLOYING -> FOR TESTING PURPOSES
}])

// TODO: Decouple and move to directives folder
// Select Challenger Directive
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
          +'<input id="filter" type="search"  ng-model="ngModel" ng-value="ngValue" ng-keydown="onKeyDown()"/>'
        +'</label>'
        +'<button class="button button-small button-clear" ng-model="ngModel" ng-click="open()">'
          +'<i class="icon ion-chevron-down"></i>'
        +'</button>'
      +'</div>'
      // Template that is displayed when dropdown button is clicked
      +'<div class="optionList padding-left padding-right" ng-hide="showHides">'
        // +'<ion-scroll>'
          +'<ul class="list">'
            +'<li class="item" ng-click="select(item)" ng-repeat="item in provider | orderBy: labelField1 | limitTo:3">{{item[labelField]}} - count {{item[labelField1]}}</li>'
          +'</ul>'
        // +'</ion-scroll>'
      +'</div>'
      // Template that is displayed when input field is typed in 
      +'<div class="optionList padding-left padding-right" ng-show="showHide">'
        // +'<ion-scroll>'
          +'<ul class="list">'
            +'<li class="item" ng-click="select(item)" ng-repeat="item in provider | filter:ngModel">{{item[labelField]}} - count {{item[labelField1]}}</li>'
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