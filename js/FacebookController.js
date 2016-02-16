
croccodilli.controller('FacebookController', ['$scope', 'postService', function($scope, postService) {

	FB.getLoginStatus(function(response) {
		$scope.$apply(function() {
			$scope.callbackStatus(response);
		});
	});
	
	$scope.loginFacebook = function() {
		FB.login(function(response) {
			console.log(response);
			$scope.$apply(function() {
				$scope.callbackStatus(response);
			});
		}, {scope: 'public_profile,email'});
	};

	$scope.callbackStatus = function(response) {
		console.log(response);
		if (response.status === 'connected') {
			$scope.isLogged = true;
			$scope.userId = response.authResponse.userID;
			$scope.getFacebookData();
		} else if (response.status === 'not_authorized') {
			$scope.isLogged = false;
		} else {
			$scope.isLogged = false;
		}
	};

	$scope.getFacebookData = function() {
		FB.api('/me', function(response) {
			console.log(response);
			$scope.$apply(function() {
				$scope.name = response.name;
			});
		});
		FB.api('/'+$scope.userId+'/picture', function (response) {
			$scope.$apply(function() {
				if (response && !response.error) {
					$scope.imageUrl = response.data.url;
				}
			});
		});
	};

	$scope.getName = function() {
		return $scope.name;
	};

	$scope.savePost = function() {
		console.log($scope.commento);
		if(!angular.isUndefined($scope.commento) && $scope.commento != null && $scope.commento.length != 0) {
			postService.savePost({
				identifier: Math.random().toString(36).slice(2),
				post: {
					poster: $scope.name,
					posterImageUrl: $scope.imageUrl,
					content: $scope.commento
				}
			}).success(function() {
				$scope.$broadcast('posts.added');
			});
		}
	};
}]);