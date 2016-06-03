
angular.module('croccodilli.controllers')

.controller('SiteController', ['$scope', '$location', function($scope, $location) {

	$scope.page = {
		loading: false
	};

	$scope.pathIs = function(path) {
		return $location.path() == path;
	};

	$scope.navigateTo = function(path) {
		$location.path(path);
	};

	$scope.getFullUrl = function() {
		return $location.absUrl();
	};

	$scope.getSiteUrl = function() {
		var fullUrl = $scope.getFullUrl();
		return fullUrl.substring(0, fullUrl.indexOf('/', 8))
	};

	$scope.showLoading = function() {
		$scope.page.loading = true;
	};

	$scope.hideLoading = function() {
		$scope.page.loading = false;
	};

	$scope.loadDiqusCounts = function() {
		if (typeof DISQUSWIDGETS != 'undefined') {
			DISQUSWIDGETS.getCount({reset: true});
		}
	};

	$scope.scaleImages = function() {
		$("img.scale").imageScale();
	};

}]);