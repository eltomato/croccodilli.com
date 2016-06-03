
angular.module('croccodilli.services')

.service('subscribeService', ['SUBSCRIBE_ENDPOINT', '$http', function(SUBSCRIBE_ENDPOINT, $http) {

	return {
		subscribe: function(email) {
			return $http.get(SUBSCRIBE_ENDPOINT, {
				params: {
					email: email
				}
			});
		}
	};

}]);