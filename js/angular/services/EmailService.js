
angular.module('croccodilli.services')
.service('emailService', ['$q', function($q) {

	var cookieName = "croccodilli";
	var cookieDurationDays = 2000;

	var isLoadingDefer = $q.defer();
	var isLoadingPromise = isLoadingDefer.promise;

	var postingInfo = {
		isLogged: false,
		isEmail: true
	};
	
	var setCookie = function(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	};

	var getCookie = function(cname) {
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

	var emailService = {
		getCookie: function() {
			return getCookie(cookieName);
		},
		setCookie: function(email) {
			setCookie(cookieName, email, cookieDurationDays);
		},
		deleteCookie: function() {
			setCookie(cookieName, "", -1);
		},
		doLogout: function() {
			emailService.deleteCookie();
			postingInfo = {
				isLogged: false,
				isEmail: true
			};
		},
		doLogin: function(email) {
			emailService.setCookie(email);
			postingInfo.name = email;
			postingInfo.isLogged = true;
			return postingInfo;
		},
		tryRestore: function() {
			var cookie = emailService.getCookie();
			if(cookie != "") {
				postingInfo.email = cookie;
				postingInfo.name = cookie;
				postingInfo.isLogged = true;
				isLoadingDefer.resolve(true);
			}
		},
		getPostingInfo: function() {
			var deferred = $q.defer();
			isLoadingPromise.then(function() {
				deferred.resolve(postingInfo);
			});
			return deferred.promise;
		}
	};

	return emailService;
}])

.run(['emailService', function(emailService) {
	emailService.tryRestore();
}]);