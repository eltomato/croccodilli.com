
angular.module('croccodilli.services')

.service('mapService', ['MAP_ENDPOINT', '$http', 'deviceDetector', function(MAP_ENDPOINT, $http, deviceDetector) {

	var me =  {
		getMarkers: function() {
			if(deviceDetector.browser == 'safari') {
				return $http.get('https://crossorigin.me/' + MAP_ENDPOINT);
			} else {
				return $http.get(MAP_ENDPOINT);
			}
		},
	};

	return me;
}]);