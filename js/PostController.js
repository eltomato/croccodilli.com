

croccodilli.controller('PostController', ['$scope', 'postService', function($scope, postService) {

	$scope.showReply = false;
	
	$scope.enableReply = function() {
		$scope.showReply = true;
	};

	$scope.hideReply = function() {
		$scope.showReply = false;
		$scope.post = {};
	};

	$scope.saveSubPost = function(groupedPost, post) {
		$scope.subposting = true;
		if(!angular.isUndefined($scope.commento) 
			&& $scope.commento != null 
			&& $scope.commento.length != 0
			&& !angular.isUndefined(groupedPost)
			&& groupedPost != null) {
			postService.savePost({
				refer: groupedPost.identifier,
				mail: '',
				poster: $scope.name,
				posterImageUrl: $scope.imageUrl,
				content: $scope.commento
			}).then(function() {
				$scope.commento = '';
				$scope.subposting = false;
				//$scope.$broadcast('posts.added');
			});
		}
	};
}]);