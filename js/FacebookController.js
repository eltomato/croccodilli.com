
croccodilli.controller('FacebookController', ['$scope', 'postService', function($scope, postService) {

	$scope.cookieName = "croccodilli";
	$scope.cookieDurationDays = 2000;

	$scope.postingInfo = {
		posting: false
	};

	$scope.loginFacebook = function() {
		window.FB && FB.login(function(response) {
			$scope.$apply(function() {
				$scope.callbackStatus(response);
			});
		}, {scope: 'public_profile,email'});
	};

	$scope.callbackStatus = function(response) {
		if (response.status === 'connected') {
			$scope.postingInfo.isLogged = true;
			$scope.postingInfo.userId = response.authResponse.userID;
			$scope.getFacebookData();
		} else if (response.status === 'not_authorized') {
			$scope.postingInfo.isLogged = false;
		} else {
			$scope.postingInfo.isLogged = false;
		}
	};

	$scope.getFacebookData = function() {
		window.FB && FB.api('/me', function(response) {
			$scope.$apply(function() {
				$scope.postingInfo.name = response.name;
			});
		});
		window.FB && FB.api('/'+$scope.postingInfo.userId+'/picture', function (response) {
			$scope.$apply(function() {
				if (response && !response.error) {
					$scope.postingInfo.imageUrl = response.data.url;
				}
			});
		});
	};

	$scope.getName = function() {
		return $scope.postingInfo.name || $scope.postingInfo.email;
	};

	$scope.savePost = function() {
		if($scope.postingInfo.isLogged
			|| (!angular.isUndefined($scope.postingInfo.email) 
			&& $scope.postingInfo.email != null
			&& $scope.postingInfo.email != "")) {
			if(!$scope.postingInfo.posting) {
				if(!angular.isUndefined($scope.postingInfo.commento)
					&& $scope.postingInfo.commento != null
					&& $scope.postingInfo.commento.length != 0) {
					$scope.postingInfo.posting = true;
					postService.savePost({
						refer: '',
						email: $scope.postingInfo.email,
						poster: $scope.postingInfo.name,
						posterImageUrl: $scope.postingInfo.imageUrl,
						content: $scope.postingInfo.commento
					}).then(function() {
						$scope.postingInfo.commento = '';
						$scope.postingInfo.posting = false;
						$scope.$broadcast('posts.added');
					});
					if($scope.postingInfo.email) {
						$scope.doLogin();
					}
				}
			}
		}
	};

	$scope.doLogin = function() {
		$scope.setCookie($scope.cookieName, $scope.postingInfo.email, $scope.cookieDurationDays);
		$scope.postingInfo.isLogged = true;
	};

	$scope.setCookie = function(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	$scope.getCookie = function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0)  {
				return c.substring(name.length,c.length);
			}
		}
		return "";
	};

	$scope.doLogout = function() {
		if($scope.postingInfo.email) {
			$scope.setCookie($scope.cookieName, $scope.postingInfo.email, -1);
			$scope.postingInfo.isLogged = false;
		} else {
			window.FB && FB.logout(function(response) {
				$scope.$apply(function() {
					$scope.postingInfo.isLogged = false;
				});
			});
		}
	};

	$scope.$on('do.login', function(event, email) {
		$scope.postingInfo.email = email;
		$scope.doLogin();
	})

	$scope.postingInfo.email = $scope.getCookie($scope.cookieName);
	if($scope.postingInfo.email == "") {
		window.FB && FB.getLoginStatus(function(response) {
			if(!$scope.$$phase) {
				$scope.$apply(function() {
					$scope.callbackStatus(response);
				});
			} else {
				$scope.callbackStatus(response);
			}
		});
	} else {
		$scope.postingInfo.isLogged = true;
	}
}]);