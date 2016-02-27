
angular.module('croccodilli.controllers')
.controller('DoPostController', ['$scope', 'md5', 'slidesService', function($scope, md5, slidesService) {
	
	$scope.logInputForm = {};
	$scope.authenticated = false;
	$scope.inputSlide = {};

	$scope.doCheck = function() {
		if(md5.createHash($scope.logInputForm.secret) == 'd20d8c98ca5a25482b358475beeb8922') {
			$scope.authenticated = true;
		}
	};

	$scope.isAuthenticated = function() {
		return $scope.authenticated;
	};

	$scope.pubblicaSlide = function() {
		$scope.inputSlide.id = $scope.slides.length;
		$scope.publishing = true;
		slidesService.save($scope.inputSlide).then(function() {
			$scope.inputSlide = {};
			$scope.publishing = false;
		});
	};

	slidesService.getSlides().then(function(slides) {
		console.log(slides);
		$scope.slides = slides;
	});
}]);