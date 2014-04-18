(function() {
   'use strict';
  /**
   * usage: <textarea ng-model="content" redactor></textarea>
   *
   *    additional options:
   *      redactor: hash (pass in a redactor options hash)
   *
   */
angular.module('ui.simple-editor', [])
   .directive('btn', function($sce){
   	// Runs during compile
   	return {
   		// name: '',
   		// priority: 1,
   		// terminal: true,
   		// scope: {}, // {} = isolate, true = child, false/undefined = no change
   		// cont­rol­ler: function($scope, $element, $attrs, $transclue) {},
   		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
   		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
   		template: '<a class="btn btn-default" data-role="{{b.role}}" href="javascript:void(0)" ng-click="b.onClick(); $event.stopPropagation();" ng-bind-html="content"></a>',
   		// templateUrl: '',
   		replace: true,
   		// transclude: true,
   		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
   		link: function($scope, iElm, iAttrs, controller) {
   			debugger;
   			if ($scope.b.text) {
   				$scope.content = $sce.trustAsHtml($scope.b.text);
   			} else {
   				$scope.content = '<i class="fa '+ $scope.b.icon +'"></i>';
   			}

   			if(!$scope.b.onClick) {
   				$scope.b.onClick = function() {
   					document.execCommand($scope.b.role, false, null);
   				}
   			}
   		}
   	};
   })
   .directive('btnGroup', function(){
   	return {
   		// name: '',
   		// priority: 1,
   		// terminal: true,
   		// {} = isolate, true = child, false/undefined = no change
   		// cont­rol­ler: function($scope, $element, $attrs, $transclue) {},
   		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
   		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
   		template: '<div class="btn-group"><btn ng-repeat="b in g"></btn></div>',
   		// templateUrl: '',
   		replace: true,
   		// transclude: true,
   		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
   		link: function($scope, iElm, iAttrs, controller) {
   		}
   	};
   })
   .directive('toolbar', function(){
   	// Runs during compile
   	return {
   		// name: '',
   		// priority: 1,
   		// terminal: true,
   		// scope: {}, // {} = isolate, true = child, false/undefined = no change
   		// cont­rol­ler: function($scope, $element, $attrs, $transclue) {},
   		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
   	 	restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
   		template: '<div class="btn-toolbar">' + 
   			'<btn-group class="bnt-group" ng-repeat="g in buttonGroups"></btn-group>' + 
		'</div>',
   		// templateUrl: '',
   		replace: true,
   		// transclude: true,
   		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
   		link: function($scope, iElm, iAttrs, controller) {
   			debugger;
   			iElm.attr('contentEditable', true);
   			iElm.parent().click(function() {
   				console.log('Enabling toolbar');
   				console.log(this);
   				/*$(this).css({
   					'margin-bottom' : iElm.height() + 'px'
   				});*/
   				iElm.show();
   			});

   			iElm.css({
   				display : 'none',
   				position : 'fixed',
   				top : 0,
   				left : 0
   			});
   			/**
   			 * TODO: Define this inside a factory
   			 */
   			$scope.buttonGroups = [
   				[
					{ role: 'undo', icon:'fa-undo'}, 
					{ role: 'redo', icon:'fa-repeat'} 
				],
   				[	
   					{ role: 'bold', icon:'fa-bold'}, 
   					{ role: 'italic', icon:'fa-italic'},
   					{ role: 'underline', icon: 'fa-underline'},
   					{ role: 'strikeThrough', icon: 'fa-strikethrough'}
				],
				[
					{ role: 'justifyLeft', icon: 'fa-align-left'},
					{ role: 'justifyCenter', icon: 'fa-align-center'},
					{ role: 'justifyRight', icon: 'fa-align-right'},
					{ role: 'justifyFull', icon: 'fa-align-justify'}
				],
				[
					{ role: 'indent', icon:'fa-indent'},
					{ role: 'outdent', icon:'fa-outdent'},
					{ role: 'insertUnorderedList', icon: 'fa-list-ul'},
					{ role: 'insertOrderedList', icon: 'fa-list-ol'}
				],
				[
					{ 
						role: 'h1',
						text: 'h<sup>1</sup>',
						onClick: function() {
							document.execCommand('formatBlock', false, 'h1')
						}
					},
					{
						role: 'h2',
						text: 'h<sup>2</sup>',
						onClick: function() {
							document.execCommand('formatBlock', false, 'h2');
						}
					},
					{
						role: 'h3',
						text: 'h<sup>3</sup>',
						onClick: function() {
							document.execCommand('formatBlock', false, 'h3');
						}
					},
					{
						role: 'p',
						text: 'p',
						onClick: function() {
							document.execCommand('formatBlock', false, 'p');
						}
					},
					{
						role: 'subscript',
						icon: 'fa-subscript'
					},
					{
						role: 'superscript',
						icon: 'fa-superscript'
					}
				],
				[
					{
						role: 'hide',
						icon: 'fa-edit',
						onClick: function() {
							
							iElm.hide();
						}
					}
				]
   			];

   		}
   	};
   })
   .directive("editable", ['$timeout', function ($timeout) {
      // Runs during compile
      return {
      	require : 'ngModel',
        restrict : 'A',
        replace : true,
        transclude : 'element',
        template : '<div>{{ngModel}}</div>',
        scope : {
            ngModel : '='
        },
        controller : function($scope, $element, $attrs, $compile) {
        	debugger;
        	var toolbarRaw = angular.element(document.createElement('toolbar'));

        	// TODO: create the toolbar within a factory to make it a singleton
        	$scope.toolbar = $compile(toolbarRaw)($scope);
        	angular.element(document.body).append($scope.toolbar);
        },
        link : function($scope, iElm, iAttrs, controller, $compile) {
        	iElm.attr('contentEditable', true);
        	
        	iElm.click(function(ev) {
        		ev.stopPropagation();
        		$scope.toolbar.show();
        	});
        }
      }
  }])
})();