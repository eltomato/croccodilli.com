
angular.module('croccodilli.directives')

.directive('loadingOnClick', ['$timeout', function($timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			$(element).on('click', function() {
				scope.showLoading();
				$timeout(scope.hideLoading, 1250);
			});
		}
	};
}]);