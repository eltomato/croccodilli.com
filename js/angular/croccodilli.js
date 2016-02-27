
angular.module('croccodilli.services', []);
angular.module('croccodilli.controllers', []);

var croccodilli = angular.module('croccodilli', [
	'croccodilli.services',
	'croccodilli.controllers',
	'ngAnimate',
	'angular-svg-round-progress',
	'ui.bootstrap',
	'angularVideoBg'
]);