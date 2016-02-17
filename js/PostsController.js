
croccodilli.controller('PostsController', ['$scope', 'postService', function($scope, postService) {

	$scope.posts = [];

	$scope.loadPosts = function() {
		postService.getPosts().then(function(posts) {
			for(var i=0; i<posts.length; i++) {
				var post = JSON.parse(posts[i].value);
				$scope.posts.push({
					poster: post.post.poster,
					posterImageUrl: post.post.posterImageUrl,
					content: post.post.content
				});
			}
		});
	};

	$scope.$on('posts.added', function() {
		$scope.loadPosts();
	});

	$scope.loadPosts();
}]);