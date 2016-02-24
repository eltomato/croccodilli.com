
angular.module('croccodilli.services', []);

var croccodilli = angular.module('croccodilli', [
	'croccodilli.services',
	'angular-svg-round-progress'
]);

croccodilli.controller('SiteController', ['$scope', '$interval', function($scope, $interval) {
	$scope.currentMillis = new Date().getTime();
	$scope.endDate = 1472122800319;
	$scope.dayInMillis = 24*60*60*1000;
	$scope.hourInMillis = 60*60*1000;
	$scope.minuteInMillis = 60*1000;
	$scope.secondInMillis = 1000;

	$scope.phrases = [{
		caption: 'Non preoccuparti se il mondo finir&agrave; oggi. &Egrave; gi&agrave; domani in Australia.',
		who: 'Charles M. Schulz'
	}, {
		caption: 'Le persone non fanno i viaggi, sono i viaggi che fanno le persone.',
		who: 'Jhon Steinbeck'
	}, {
		caption: 'La cosa pi&ugrave; pericolosa da fare &egrave; rimanere immobili.',
		who: 'William Burroughs'
	}, {
		caption: 'Dobbiamo andare e non fermarci finch&egrave; non siamo arrivati. Dove andiamo? Non lo so ma dobbiamo andare.',
		who: 'Jack Kerouac'
	}, {
		caption: 'Non smetteremo di eplorare. <br>Ed alla fine di tutto il nostro andare, ritorneremo al punto di partenza per conoscerlo per la prima volta.',
		who: 'T. S. Eliot'
	}, {
		caption: 'Tra vent&prime;anni sarete pi&ugrave; delusi per le cose che non avete fatto che per quelle che avete fatto. <br>Quindi mollate le cime. <br>Allontanatevi dal porto sicuro. <br>Prendete con le vostre vele i venti. <br> Eplorate. <br> Sognate. <br>Scoprite.',
		who: 'Mark Twain'
	}];

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
