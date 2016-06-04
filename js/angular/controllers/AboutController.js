angular.module('croccodilli.controllers')

.controller('AboutController', ['$scope', 'mapService', function($scope, mapService) {
	
	mapService.getMarkers().success(function(markers) {
		$scope.markers = markers;
	});
	
	// $scope.markers = [
	// 	[45.416479, 10.990409],
	// 	[45.716479, 10.990409]
	// ];
	
	$scope.getMapCenter = function() {
		if($scope.markers) {
			return $scope.markers[$scope.markers.length-1][0] + ", " + $scope.markers[$scope.markers.length-1][1];
		}
	};

	$scope.styles = [{
		"featureType": "administrative.locality",
		"elementType": "all",
		"stylers": [{
			"hue": "#2c2e33"
		}, {
			"saturation": 7
		}, {
			"lightness": 19
		}, {
			"visibility": "on"
		}]
	}, {
		"featureType": "landscape",
		"elementType": "all",
		"stylers": [{
			"hue": "#ffffff"
		}, {
			"saturation": -100
		}, {
			"lightness": 100
		}, {
			"visibility": "simplified"
		}]
	}, {
		"featureType": "poi",
		"elementType": "all",
		"stylers": [{
			"hue": "#ffffff"
		}, {
			"saturation": -100
		}, {
			"lightness": 100
		}, {
			"visibility": "off"
		}]
	}, {
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [{
			"hue": "#bbc0c4"
		}, {
			"saturation": -93
		}, {
			"lightness": 31
		}, {
			"visibility": "simplified"
		}]
	}, {
		"featureType": "road",
		"elementType": "labels",
		"stylers": [{
			"hue": "#bbc0c4"
		}, {
			"saturation": -93
		}, {
			"lightness": 31
		}, {
			"visibility": "on"
		}]
	}, {
		"featureType": "road.arterial",
		"elementType": "labels",
		"stylers": [{
			"hue": "#bbc0c4"
		}, {
			"saturation": -93
		}, {
			"lightness": -2
		}, {
			"visibility": "simplified"
		}]
	}, {
		"featureType": "road.local",
		"elementType": "geometry",
		"stylers": [{
			"hue": "#e9ebed"
		}, {
			"saturation": -90
		}, {
			"lightness": -8
		}, {
			"visibility": "simplified"
		}]
	}, {
		"featureType": "transit",
		"elementType": "all",
		"stylers": [{
			"hue": "#e9ebed"
		}, {
			"saturation": 10
		}, {
			"lightness": 69
		}, {
			"visibility": "on"
		}]
	}, {
		"featureType": "water",
		"elementType": "all",
		"stylers": [{
			"hue": "#e9ebed"
		}, {
			"saturation": -78
		}, {
			"lightness": 67
		}, {
			"visibility": "simplified"
		}]
	}];

}]);