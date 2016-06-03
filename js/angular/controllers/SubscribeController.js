
angular.module('croccodilli.controllers')

.controller('SubscribeController', ['$scope', 'subscribeService', function($scope, subscribeService) {

	$scope.notification = 'Siamo talmente evoluti come specie che possiamo addirittura avvisarti se ci sono novità!';
	$scope.subscription = {};

	$scope.subscribeMe = function() {
		console.log($scope.email);
		if($scope.subscription.email) {
			subscribeService.subscribe($scope.subscription.email).success(function(response) {
				if(response.error) {
					$scope.notification = "Avremo anche la tecnologia per farlo, ma discendiamo dalle scimmie...prova a registrarti la prossima volta!";
					$scope.email = null;
				} else {
					$scope.notification = "Ti sei registrato per gli aggiornamenti. Il nostro esercito di scimmie penserà a notificarti!";
					$scope.email = null;
					$scope.subscriptionDone = true;
				}
			}).error(function() {
				$scope.notification = "Avremo anche la tecnologia per farlo, ma discendiamo dalle scimmie...prova a registrarti la prossima volta!";
				$scope.email = null;
			});
		} else {
			$scope.notification = "Dovremmo essere tutti evoluti a sufficienza per inserire un indirizzo email dove richiesto...";
		}
	};
}]);