
angular.module('croccodilli.services')

.service('mapService', ['MAP_ENDPOINT', '$http', function(MAP_ENDPOINT, $http) {

	var me =  {
		getMarkers: function() {
			return $http.get(MAP_ENDPOINT);
		},
	};

	return me;
}]);