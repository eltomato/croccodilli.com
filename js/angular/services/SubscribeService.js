
angular.module('croccodilli.services')

.service('subscribeService', ['SUBSCRIBE_ENDPOINT', '$http', 'deviceDetector', function(SUBSCRIBE_ENDPOINT, $http, deviceDetector) {

	return {
		subscribe: function(email) {
			if(deviceDetector.browser == 'safari') {
				return $http.get('https://crossorigin.me/' + SUBSCRIBE_ENDPOINT, {
					params: {
						email: email
					}
				});
			} else {
				return $http.get(SUBSCRIBE_ENDPOINT, {
					params: {
						email: email
					}
				});
			}
		}
	};

}]);