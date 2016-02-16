
croccodilli.controller('FacebookController', ['$scope', function($scope) {

	FB.getLoginStatus($scope.callbackStatus);
	
	$scope.loginFacebook = function() {
		FB.login(function(response) {
			console.log(response);
		}, {scope: 'public_profile,email'});
	};

	$scope.callbackStatus = function(response) {
		console.log(response);
		if (response.status === 'connected') {
		} else if (response.status === 'not_authorized') {
		} else {
		}
	};
}]);