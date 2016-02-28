
angular.module('croccodilli.controllers')
.controller('SlidesController', ['$scope', 'slidesService', function($scope, slidesService) {

	$scope.noWrap = false;
	$scope.active = 0;

	$scope.getSlideBackground = function(slide) {
		if(slide && slide.background) {
			return {
				'background-image': 'url('+slide.background+')',
				'background-size': 'cover'
			};
		} else if(slide && !slide.videoId) {
			return {
				'background-image': 'url(../img/back2.jpg)',
				'background-size': 'cover'
			};
		}
	};

	$scope.selectSlide = function(slide) {
		$scope.slideSelected = slide;
	};

	$scope.loadingSlides = true;
	slidesService.getSlides().then(function(slides) {
		$scope.slides = slides;
		$scope.loadingSlides = false;
	});
}]);