(function () {
  'use strict';

  /**
   * usage: <div ng-model="content" editable></textarea>
   */
  angular.module('ui.simple-editor', [])
    .directive("editable", ['$timeout', function ($timeout) {
      // Runs during compile
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      scope: {
        model : '=ngModel'
      }, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs) {        
        $scope.f = function() {          
          $scope.model = $element.html();      
          $scope.editControlls.css({
            top : $element.offset().top + $element.outerHeight()
          })    
          $scope.timeout = setTimeout($scope.f, 500);
        }
      },
      require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      // templateUrl: './template',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function($scope, iElm, iAttrs, controller) {        
        $scope.editControlls = $('<div>',{          
          class : 'well well-sm',
          role : 'toolbar'
        }).css({
          position : 'absolute',
          top : iElm.offset().top + iElm.height(),
          display : 'none',          
        });

        var controlls = "<div id='editControls' class='btn-toolbar'>" +
          "<div class='btn-group'>" +
            "<a class='btn btn-default' data-role='undo' href='javascript:void(0)'><i class='fa fa-undo'></i></a>" +
            "<a class='btn btn-default' data-role='redo' href='javascript:void(0)'><i class='fa fa-repeat'></i></a>" +
          "</div>" +
          "<div class='btn-group'>" +
            "<a class='btn btn-default' data-role='bold' href='javascript:void(0)'><i class='fa fa-bold'></i></a>" +
            "<a class='btn btn-default' data-role='italic' href='javascript:void(0)'><i class='fa fa-italic'></i></a>" +
            "<a class='btn btn-default' data-role='underline' href='javascript:void(0)'><i class='fa fa-underline'></i></a>" +
            "<a class='btn btn-default' data-role='strikeThrough' href='javascript:void(0)'><i class='fa fa-strikethrough'></i></a>" +
            "<a class='btn btn-default' data-role='justifyLeft' href='javascript:void(0)'><i class='fa fa-align-left'></i></a>" +
          "</div>" +
          "<div class='btn-group'>" +
            "<a class='btn btn-default' data-role='justifyCenter' href='javascript:void(0)'><i class='fa fa-align-center'></i></a>" +
            "<a class='btn btn-default' data-role='justifyRight' href='javascript:void(0)'><i class='fa fa-align-right'></i></a>" +
            "<a class='btn btn-default' data-role='justifyFull' href='javascript:void(0)'><i class='fa fa-align-justify'></i></a>" +
          "</div>" +
          "<div class='btn-group'>" +
            "<a class='btn btn-default' data-role='indent' href='javascript:void(0)'><i class='fa fa-indent'></i></a>" +
            "<a class='btn btn-default' data-role='outdent' href='javascript:void(0)'><i class='fa fa-outdent'></i></a>" +
            "<a class='btn btn-default' data-role='insertUnorderedList' href='javascript:void(0)'><i class='fa fa-list-ul'></i></a>" +
            "<a class='btn btn-default' data-role='insertOrderedList' href='javascript:void(0)'><i class='fa fa-list-ol'></i></a>" +
          "</div>" +
          "<div class='btn-group'>" +
            "<a class='btn btn-default' data-role='h1' href='javascript:void(0)'>h<sup>1</sup></a>" +
            "<a class='btn btn-default' data-role='h2' href='javascript:void(0)'>h<sup>2</sup></a>" +
            "<a class='btn btn-default' data-role='p' href='javascript:void(0)'>p</a>" +
            "<a class='btn btn-default' data-role='subscript' href='javascript:void(0)'><i class='fa fa-subscript'></i></a>" +
            "<a class='btn btn-default' data-role='superscript' href='javascript:void(0)'><i class='fa fa-superscript'></i></a>" +
          "</div>" +
          "<div class='btn-group'>" +
            "<a class='btn btn-default' data-role='hide' href='javascript:void(0)'><i class='fa fa-edit'></i></a>" +
          "</div>" + 
          "<div class='btn-group'>" +
            "{{content}}" +
          "</div>"
        "</div>" + $scope.model;

        $scope.editControlls.append(controlls);

        iElm.parent().prepend($scope.editControlls);
        iElm.attr('contentEditable', true);

        $('#editControls a').click(function(e) {
          switch($(this).data('role')) {
            case 'hide' :
              $scope.editControlls.hide();
              window.clearTimeout($scope.timeout);
              break;
            case 'h1':
            case 'h2':
            case 'p':
              document.execCommand('formatBlock', false, $(this).data('role'));
              break;
            default:
              document.execCommand($(this).data('role'), false, null);
              break;
            }
        });

        iElm.on('click', function() {
          $scope.editControlls.show();
          $scope.f();
        });

      }
    };
    }]);
})();

