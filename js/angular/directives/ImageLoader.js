
angular.module('croccodilli.directives')

.directive('imageLoader', ['$compile', function($compile) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			scope.image = {
				loaded: false
			};
			var loadingDiv = '<div ng-if="!image.loaded"'+
				'class="loader-inline-wrapper">'+
				'<div class="loader"></div>'+
			'</div>';
			$compile(loadingDiv)(scope).insertAfter(element);
			element.on('load', function() {
				scope.$apply(function() {
					scope.image.loaded = true
				});
			});
		}
	};
}]);