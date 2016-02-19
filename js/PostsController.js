
croccodilli.controller('PostsController', ['$scope', 'postService', function($scope, postService) {

	$scope.groupedPosts = [];

	$scope.loadPosts = function() {
		postService.getPosts().then(function(posts) {
			$scope.groupedPosts = posts;
		});
	};

	$scope.$on('posts.added', function() {
		$scope.loadPosts();
	});

	$scope.loadPosts();
}]);