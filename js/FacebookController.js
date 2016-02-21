
croccodilli.controller('FacebookController', ['$scope', 'postService', function($scope, postService) {

	$scope.cookieName = "croccodilli";
	$scope.cookieDurationDays = 2000;

	$scope.loginFacebook = function() {
		window.FB && FB.login(function(response) {
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
		window.FB && FB.api('/me', function(response) {
			console.log(response);
			$scope.$apply(function() {
				$scope.name = response.name;
			});
		});
		window.FB && FB.api('/'+$scope.userId+'/picture', function (response) {
			$scope.$apply(function() {
				if (response && !response.error) {
					$scope.imageUrl = response.data.url;
				}
			});
		});
	};

	$scope.getName = function() {
		return $scope.name || $scope.email;
	};

	$scope.savePost = function() {
		if(!$scope.posting) {
			if(!angular.isUndefined($scope.commento)
				&& $scope.commento != null
				&& $scope.commento.length != 0) {
				$scope.posting = true;
				postService.savePost({
					refer: '',
					email: $scope.email,
					poster: $scope.name,
					posterImageUrl: $scope.imageUrl,
					content: $scope.commento
				}).then(function() {
					$scope.commento = '';
					$scope.posting = false;
					$scope.$broadcast('posts.added');
				});
				if($scope.email) {
					$scope.doLogin();
				}
			}
		}
	};

	$scope.doLogin = function() {
		$scope.setCookie($scope.cookieName, $scope.email, $scope.cookieDurationDays);
		$scope.isLogged = true;
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
		if($scope.email) {
			$scope.setCookie($scope.cookieName, $scope.email, -1);
			$scope.isLogged = false;
		} else {
			window.FB && FB.logout(function(response) {
				$scope.$apply(function() {
					$scope.isLogged = false;
				});
			});
		}
	};

	$scope.email = $scope.getCookie($scope.cookieName);
	if($scope.email == "") {
		window.FB && FB.getLoginStatus(function(response) {
			$scope.$apply(function() {
				$scope.callbackStatus(response);
			});
		});
	} else {
		$scope.isLogged = true;
	}
}]);