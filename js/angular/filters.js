
angular.module('croccodilli.filters')

.filter('matchMedia', ['$window', function($window) {
    return function matchMedia (mediaQueryString) {
        return $window.matchMedia(mediaQueryString).matches;
    };
}]);