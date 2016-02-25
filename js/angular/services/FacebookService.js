
angular.module('croccodilli.services')
.service('facebookService', ['$q', '$timeout', function($q, $timeout) {

	var FB = window.FB;
	var isLoadingDefer = $q.defer();
	var isLoadingPromise = isLoadingDefer.promise;
	var postingInfo = {
		isLogged: false,
		isFacebook: true
	};

	var doApplyLogin = function(response) {
		var deferred = $q.defer();
		if(response) {
			if (response.status === 'connected') {
				postingInfo.isLogged = true;
				postingInfo.userId = response.authResponse.userID;
				getFacebookData().then(function() {
					deferred.resolve(postingInfo);
				});
			} else {
				postingInfo.isLogged = false;
				$timeout(function() {
					deferred.resolve(postingInfo);
				});
			}
		}
		return deferred.promise;
	};

	var getFacebookData = function() {
		var deferred = $q.defer();
		if(facebookService.isFacebookActive()) {
			FB.api('/me', function(response) {
				postingInfo.name = response.name;

				FB.api('/'+postingInfo.userId+'/picture', function(response) {
					postingInfo.imageUrl = response.data.url;
					deferred.resolve(true);
				});
			});
		}
		return deferred.promise;
	};

	var facebookService = {
		isFacebookActive: function() {
			return !angular.isUndefined(FB) && FB != null;
		},
		doLogout: function() {
			if(facebookService.isFacebookActive) {
				FB.logout();
				postingInfo = {
					isLogged: false,
					isFacebook: true
				};
			}
		},
		doLogin: function() {
			var deferred = $q.defer();
			if(facebookService.isFacebookActive()) {
				FB.login(function(response) {
					doApplyLogin(response).then(function() {
						deferred.resolve(postingInfo);
					});
				}, {scope: 'public_profile,email'});
			} else {
				$timeout(function() {
					deferred.resolve(false);
				});
			}
			return deferred.promise;
		},
		tryRestore: function() {
			var deferred = $q.defer();
			if(facebookService.isFacebookActive()) {
				$timeout(function() {
					FB.getLoginStatus(function(response) {
						doApplyLogin(response).then(function() {
							isLoadingDefer.resolve(true);
							deferred.resolve(postingInfo);
						});
					});
				});
			} else {
				$timeout(function() {
					deferred.resolve(false);
				});
			}
			return deferred.promise;
		},
		getPostingInfo: function() {
			var deferred = $q.defer();
			isLoadingPromise.then(function() {
				deferred.resolve(postingInfo);
			});
			return deferred.promise;
		}
	};

	return facebookService;
}])

.run(['facebookService', function(facebookService) {
	facebookService.tryRestore();
}]);