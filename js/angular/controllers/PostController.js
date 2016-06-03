
angular.module('croccodilli.controllers')

.controller('PostController', ['$scope', '$routeParams', 'postService', function($scope, $routeParams, postService) {

	$scope.somethingBadHappened = false;
	$scope.postObiWanKenobi = {
		writer: 'ObiWanKenobi',
		title: 'Questo non è il post che state cercando.'
	};
	$scope.postShitHappens = {
		title: 'S**t happens! Ricarica dai...'
	};

	if($routeParams.postId) {
		postService.getPost($routeParams.postId).success(function(post) {
			if(post.error) {
				$scope.post = $scope.postObiWanKenobi;
				$scope.somethingBadHappened = true;
			} else {
				$scope.post = post;
			}
		}).error(function() {
			$scope.post = $scope.postShitHappens;
			$scope.somethingBadHappened = true;
		});
	} else {
		$scope.post = $scope.postObiWanKenobi;
		$scope.somethingBadHappened = true;
	}

	$scope.getPostType = function(post) {
		return postService.getPostType(post);
	};

	$scope.showSocial = function() {
		$scope.showsocial = true;
	};

}]);