

croccodilli.controller('PostController', ['$scope', 'postService', function($scope, postService) {

	$scope.showReply = false;
	$scope.subpostingInfo = {
		subpost: {}
	};
	
	$scope.enableReply = function() {
		$scope.showReply = true;
	};

	$scope.hideReply = function() {
		$scope.showReply = false;
		$scope.subpost = {};
	};

	$scope.saveSubPost = function(groupedPost, email) {
		var email = $scope.subpostingInfo.subpost.email || $scope.postingInfo.email;
		if($scope.postingInfo.isLogged 
			|| (!angular.isUndefined(email) 
			&& email != null
			&& email != "")) {
			if(!$scope.subpostingInfo.subposting) {
				if(!angular.isUndefined($scope.subpostingInfo.subpost.commento) 
					&& $scope.subpostingInfo.subpost.commento != null 
					&& $scope.subpostingInfo.subpost.commento.length != 0
					&& groupedPost.post
					&& !angular.isUndefined(groupedPost.post)
					&& groupedPost.post != null
					&& groupedPost.post.identifier) {
					$scope.subpostingInfo.subposting = true;
					postService.savePost({
						refer: groupedPost.post.identifier,
						email: email,
						poster: $scope.postingInfo.name,
						posterImageUrl: $scope.postingInfo.imageUrl,
						content: $scope.subpostingInfo.subpost.commento
					}).then(function(savedPost) {
						groupedPost.referred.push(savedPost);
						$scope.subpostingInfo.commento = '';
						$scope.subpostingInfo.subposting = false;
						if($scope.subpostingInfo.subpost.email) {
							$scope.$emit('do.login', $scope.subpostingInfo.subpost.email);
						}
						$scope.hideReply();
					});
				}
			}
		}
	};
}]);