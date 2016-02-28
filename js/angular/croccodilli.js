
angular.module('croccodilli.filters', []);
angular.module('croccodilli.services', []);
angular.module('croccodilli.controllers', []);

var croccodilli = angular.module('croccodilli', [
	'croccodilli.filters',
	'croccodilli.services',
	'croccodilli.controllers',
	'angular-svg-round-progress',
	'angularVideoBg',
	'smoothScroll',
	'slick'
]);