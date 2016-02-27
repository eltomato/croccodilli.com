

angular.module('croccodilli.controllers')
.controller('SubPostController', ['$scope', 'postService', 'facebookService', function($scope, postService, facebookService) {

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
						fbUserId: $scope.postingInfo.userId,
						poster: $scope.postingInfo.name,
						posterImageUrl: $scope.postingInfo.imageUrl,
						content: $scope.subpostingInfo.subpost.commento
					}).then(function(savedPost) {
						groupedPost.referred.push(savedPost);
						$scope.subpostingInfo.commento = '';
						$scope.subpostingInfo.subposting = false;
						/*if($scope.subpostingInfo.subpost.email) {
							$scope.doLogin($scope.subpostingInfo.subpost.email);
						}*/
						$scope.sendNotifications(groupedPost);
						$scope.hideReply();
					});
				}
			}
		}
	};

	$scope.sendNotifications = function(groupedPost) {
		if($scope.postingInfo.isEmail) {
		} else {
			var notificationUserIds = $scope.extractFacebookNotificationIds(groupedPost);
			for(var i=0; i<notificationUserIds.length; i++) {
				facebookService.sendNotification(notificationUserIds[i]);
			}
		}
	};

	$scope.extractFacebookNotificationIds = function(groupedPost) {
		var notificationUserIds = [];
		if(groupedPost.post.fbUserId 
			&& groupedPost.post.fbUserId != $scope.postingInfo.userId) {
			notificationUserIds.push(groupedPost.post.fbUserId);
		}
		for(var i=0; i<groupedPost.referred.length; i++) {
			var currentPost = groupedPost.referred[i];
			if(!angular.isUndefined(currentPost.fbUserId)
				&& currentPost.fbUserId 
				&& currentPost.fbUserId != $scope.postingInfo.userId
				&& (notificationUserIds.indexOf(currentPost.fbUserId) == -1)) {
				notificationUserIds.push(currentPost.fbUserId);
			}
		}
		return notificationUserIds;
	};

	$scope.isGroupedPostValid = function(groupedPost) {
		return groupedPost.post
			&& !angular.isUndefined(groupedPost.post)
			&& groupedPost.post != null
			&& groupedPost.post.identifier;
	};
}]);