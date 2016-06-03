
angular.module('croccodilli.filters')

.filter('shortDateFormat', [function() {
	return function(date) {
		return moment(date).tz('Europe/Rome').format('DD MMM YYYY');
	};
}]);