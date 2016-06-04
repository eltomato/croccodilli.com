
angular.module('croccodilli.constants', []);
angular.module('croccodilli.filters', []);
angular.module('croccodilli.services', []);
angular.module('croccodilli.controllers', []);
angular.module('croccodilli.directives', []);

var croccodilli = angular.module('croccodilli', [
	'ngRoute',
	'croccodilli.constants',
	'croccodilli.filters',
	'croccodilli.services',
	'croccodilli.controllers',
	'croccodilli.directives',
	'youtube-embed',
	'720kb.socialshare',
	'ngMap'
]);

croccodilli.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/posts', {
		templateUrl: 'partials/posts.html',
		controller: 'PostsController'
	}).when('/posts/:postId', {
		templateUrl: 'partials/post.html',
		controller: 'PostController'
	}).when('/spam', {
		templateUrl: 'partials/spam.html',
		controller: 'SpamController'
	}).when('/about', {
		templateUrl: 'partials/about.html',
		controller: 'AboutController'
	}).otherwise({
		redirectTo: '/posts'
	});
}]);

croccodilli.config(['$locationProvider', function($locationProvider) {
	//required for disqus
	$locationProvider.hashPrefix('!');
}]);
