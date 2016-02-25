

angular.module('croccodilli.controllers')
.controller('SubPostController', ['$scope', 'postService', function($scope, postService) {

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

	$scope.saveSubPost = function(groupedPost) {
		var email = $scope.subpostingInfo.subpost.email || $scope.postingInfo.email;
		if($scope.isLogged() || $scope.isEmailValid(email)) {
			if(!$scope.subpostingInfo.subposting) {
				if($scope.isCommentoValid($scope.subpostingInfo.subpost.commento)
					&& $scope.isGroupedPostValid(groupedPost)) {

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
							$scope.doLogin($scope.subpostingInfo.subpost.email);
						}
						$scope.hideReply();
					});
				}
			}
		}
	};

	$scope.isGroupedPostValid = function(groupedPost) {
		return groupedPost.post
			&& !angular.isUndefined(groupedPost.post)
			&& groupedPost.post != null
			&& groupedPost.post.identifier;
	};
}]);