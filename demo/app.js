'use strict';
angular.module('app', ['ngRoute', 'ui.simple-editor'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when("/", { templateUrl: "views/main.html", controller: "SimpleEditorDemo"})
      .otherwise({ redirectTo: "/" });
  }]);

angular.module('app')
  .controller('SimpleEditorDemo', 
    function ($scope) {

    });