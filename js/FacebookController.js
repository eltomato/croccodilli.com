
croccodilli.controller('FacebookController', ['$scope', function($scope) {

	FB.getLoginStatus(function(response) {
		$scope.$apply(function() {
			$scope.callbackStatus(response);
		});
	});
	
	$scope.loginFacebook = function() {
		FB.login(function(response) {
			console.log(response);
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
}]);