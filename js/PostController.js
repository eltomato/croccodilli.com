

croccodilli.controller('PostController', ['$scope', 'postService', function($scope, postService) {

	$scope.showReply = false;
	$scope.subpost = {};
	
	$scope.enableReply = function() {
		$scope.showReply = true;
	};

	$scope.hideReply = function() {
		$scope.showReply = false;
		$scope.subpost = {};
	};

	$scope.saveSubPost = function(groupedPost) {
		if(!$scope.subposting) {
			$scope.subposting = true;
			if(!angular.isUndefined($scope.subpost.commento) 
				&& $scope.subpost.commento != null 
				&& $scope.subpost.commento.length != 0
				&& groupedPost.post
				&& !angular.isUndefined(groupedPost.post)
				&& groupedPost.post != null
				&& groupedPost.post.identifier) {
				postService.savePost({
					refer: groupedPost.post.identifier,
					mail: '',
					poster: $scope.name,
					posterImageUrl: $scope.imageUrl,
					content: $scope.subpost.commento
				}).then(function(savedPost) {
					groupedPost.referred.push(savedPost);
					$scope.commento = '';
					$scope.subposting = false;
					$scope.hideReply();
				});
			}
		}
	};
}]);