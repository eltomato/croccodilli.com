
angular.module('croccodilli.controllers')
.controller('SlidesController', ['$scope', 'slidesService', function($scope, slidesService) {

	$scope.noWrap = false;
	$scope.active = 0;

	$scope.getCurrentSlideBackground = function() {
		if($scope.slides && $scope.slides[$scope.active].background) {
			return {
				'background-image': 'url('+$scope.slides[$scope.active].background+')'
			};
		}
	};

	slidesService.getSlides().then(function(slides) {
		$scope.slides = slides;
	});
}]);