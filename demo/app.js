'use strict';
angular.module('app', [
	'ngRoute', 'ui.simple-editor', 'ngSanitize'
])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when("/", { templateUrl: "views/main.html", controller: "SimpleEditorDemo"})
      .otherwise({ redirectTo: "/" });
  }]);

angular.module('app')
  .controller('SimpleEditorDemo', 
    function ($scope) {
      $scope.content1 = "Initing content1";
      $scope.content2 = "ciao";
      $scope.content3 = "Heelp!!!!";
    });