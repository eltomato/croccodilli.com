
angular.module('croccodilli.controllers')
.controller('PostsController', ['$scope', 'postService', function($scope, postService) {

	$scope.groupedPosts = [];

	$scope.loadPosts = function() {
		$scope.loadingPosts = true;
		postService.getPosts().then(function(posts) {
			$scope.groupedPosts = posts;
			$scope.loadingPosts = false;
		});
	};

	$scope.$on('posts.added', function() {
		$scope.loadPosts();
	});

	$scope.loadPosts();
}]);