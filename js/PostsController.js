
croccodilli.controller('PostsController', ['$scope', 'postService', function($scope, postService) {

	$scope.posts = [];

	$scope.loadPosts = function() {
		postService.getPosts().then(function(posts) {
			for(var i=0; i<posts.length; i++) {
				$scope.posts = posts;
			}
		});
	};

	$scope.$on('posts.added', function() {
		$scope.loadPosts();
	});

	$scope.loadPosts();
}]);