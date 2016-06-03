
angular.module('croccodilli.directives')

.directive('owlCarousel', ['$timeout', function($timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			$timeout(function() {
				$(element).owlCarousel({
					autoPlay: true,
					items: 1,
					navigation: true,
					navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
					dots: false,
					loop: true,
					itemsDesktop: [1199, 1],
					itemsDesktopSmall: [980, 1],
					itemsMobile: [479, 1],
					itemsTablet: [768, 1],
					itemsTabletSmall: false
				});
				$(element).find('.owl-controls').on('click', function(event) {
					event.preventDefault();
					return false;
				});
			});
		}
	};
}]);