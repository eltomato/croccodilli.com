
angular.module('croccodilli.controllers')
.controller('LoginController', ['$scope', 'facebookService', 'emailService', 'postService', function($scope, facebookService, emailService, postService) {

	$scope.postingInfo = {
		posting: false
	};

	$scope.savePost = function() {
		if($scope.isLogged() || $scope.isEmailValid($scope.postingInfo.email)) {
			if(!$scope.postingInfo.posting) {
				if($scope.isCommentoValid($scope.postingInfo.commento)) {
					$scope.postingInfo.posting = true;

					postService.savePost({
						refer: '',
						email: $scope.postingInfo.email,
						fbUserId: $scope.postingInfo.userId,
						poster: $scope.postingInfo.name,
						posterImageUrl: $scope.postingInfo.imageUrl,
						content: $scope.postingInfo.commento
					}).then(function() {
						$scope.postingInfo.commento = '';
						$scope.postingInfo.posting = false;
						$scope.$broadcast('posts.added');
					});

					if($scope.postingInfo.email) {
						$scope.doLogin($scope.postingInfo.email);
					}
				}
			}
		}
	};

	$scope.isEmailValid = function(email) {
		return (!angular.isUndefined(email) 
			&& email != null
			&& email != "");
	};

	$scope.isCommentoValid = function(commento) {
		return (!angular.isUndefined(commento)
			&& commento != null
			&& commento.length != 0)
	};

	$scope.doLogin = function(email) {
		if(email) {
			$scope.postingInfo = emailService.doLogin(email);
		} else {
			facebookService.doLogin().then(function(postingInfo) {
				$scope.postingInfo = postingInfo;
			});
		}
	};

	$scope.doLogout = function() {
		if($scope.postingInfo.isEmail) {
			emailService.doLogout();
			$scope.postingInfo = emailService.getPostingInfo();
		} else {
			facebookService.doLogout();
			$scope.postingInfo = facebookService.getPostingInfo();
		}
	};

	$scope.isLogged = function() {
		return $scope.postingInfo.isLogged;
	};

	facebookService.getPostingInfo().then(function(postingInfo) {
		if(!postingInfo.isLogged) {
			emailService.getPostingInfo().then(function(postingInfo) {
				$scope.postingInfo = postingInfo;
			});	
		} else {
			$scope.postingInfo = postingInfo;
		}
	});
}]);