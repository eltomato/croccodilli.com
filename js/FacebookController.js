
croccodilli.controller('FacebookController', ['$scope', function($scope) {
	
	$scope.loginFacebook = function() {
		FB.login(function(response) {
			console.log(response);
		}, {scope: 'public_profile,email'});
	};
}]);