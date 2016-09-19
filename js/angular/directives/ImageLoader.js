
angular.module('croccodilli.directives')

.directive('imageLoader', ['$compile', function($compile) {
	return {
		restrict: 'A',
		scope: {},
		link: function(scope, element, attrs) {
			scope.image = {
				loaded: false
			};
			var loadingDiv = '<div ng-if="!image.loaded"'+
				'class="loader-inline-wrapper">'+
				'<div class="loader"></div>'+
			'</div>';
			$compile(loadingDiv)(scope).insertAfter(element);
			element.css('display', 'none');
			element.load(function() {
				scope.$apply(function() {
					scope.image.loaded = true
					element.css('display', 'block');
				});
			});
		}
	};
}]);