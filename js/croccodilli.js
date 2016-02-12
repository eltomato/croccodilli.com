var croccodilli = angular.module('croccodilli', []);

croccodilli.controller('SiteController', ['$scope', '$interval', function($scope, $interval) {
	$scope.currentMillis = new Date().getTime();
	$scope.endDate = 1472139914137;
	$scope.dayInMillis = 24*60*60*1000;
	$scope.hourInMillis = 60*60*1000;
	$scope.minuteInMillis = 60*1000;
	$scope.secondInMillis = 1000;

	$scope.getDepartureMillis = function() {
		return $scope.endDate - $scope.currentMillis;
	};

	$scope.days = function() {
		return Math.floor(($scope.getDepartureMillis() / $scope.dayInMillis));
	};

	$scope.hours = function() {
		return Math.floor(($scope.getDepartureMillis() % $scope.dayInMillis) / $scope.hourInMillis);
	};

	$scope.minutes = function() {
		return Math.floor((($scope.getDepartureMillis() % $scope.dayInMillis) % $scope.hourInMillis) / $scope.minuteInMillis);
	};

	$scope.seconds = function() {
		return Math.floor(((($scope.getDepartureMillis() % $scope.dayInMillis) % $scope.hourInMillis) % $scope.minuteInMillis) / $scope.secondInMillis);
	};

	$interval(function() {
		$scope.currentMillis = $scope.currentMillis + $scope.secondInMillis;
	}, 1000);

}]);
