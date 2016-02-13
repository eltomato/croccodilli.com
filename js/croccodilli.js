var croccodilli = angular.module('croccodilli', ['angular-svg-round-progress']);

croccodilli.controller('SiteController', ['$scope', '$interval', function($scope, $interval) {
	$scope.currentMillis = new Date().getTime();
	$scope.endDate = 1472119200319;
	$scope.dayInMillis = 24*60*60*1000;
	$scope.hourInMillis = 60*60*1000;
	$scope.minuteInMillis = 60*1000;
	$scope.secondInMillis = 1000;

	$scope.seconds = 0;

	$scope.getDepartureMillis = function() {
		return $scope.endDate - $scope.currentMillis;
	};

	$scope.calcDays = function() {
		return Math.floor(($scope.getDepartureMillis() / $scope.dayInMillis));
	};

	$scope.calcHours = function() {
		return Math.floor(($scope.getDepartureMillis() % $scope.dayInMillis) / $scope.hourInMillis);
	};

	$scope.calcMinutes = function() {
		return Math.floor((($scope.getDepartureMillis() % $scope.dayInMillis) % $scope.hourInMillis) / $scope.minuteInMillis);
	};

	$scope.calcSeconds = function() {
		return Math.floor(((($scope.getDepartureMillis() % $scope.dayInMillis) % $scope.hourInMillis) % $scope.minuteInMillis) / $scope.secondInMillis);
	};

	$scope.updateTime = function() {
		$scope.currentMillis = $scope.currentMillis + $scope.secondInMillis;
		$scope.seconds = $scope.calcSeconds();
		$scope.minutes = $scope.calcMinutes();
		$scope.hours = $scope.calcHours();
		$scope.days = $scope.calcDays();
	};

	$interval(function() {
		$scope.updateTime();
	}, 1000);

	$scope.updateTime();

}]);
