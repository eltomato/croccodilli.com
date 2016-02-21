

croccodilli.controller('PostController', ['$scope', 'postService', function($scope, postService) {

	$scope.showReply = false;
	
	$scope.enableReply = function() {
		$scope.showReply = true;
	};

	$scope.hideReply = function() {
		$scope.showReply = false;
	};

	$scope.saveSubPost = function(parentPost) {
		$scope.subposting = true;
		if(!angular.isUndefined($scope.commento) 
			&& $scope.commento != null 
			&& $scope.commento.length != 0
			&& !angular.isUndefined(parentPost)
			&& parentPost != null
			&& parentPost.identifier) {
			postService.savePost({
				refer: parentPost.identifier,
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