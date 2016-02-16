
angular.module('croccodilli.services').service('postService', ['$http', function($http) {
	var baseUrl = 'https://kvstore.p.mashape.com';
	var collectionName = 'posts';
	var config= {
		headers: {
			'X-Mashape-Key': 'EeJHszUpXjmshnPi0HK09gtysI4ap1soKStjsnrSEtI0DeQXNW'
		}
	};

	var get = function(path) {
		return $http.get(baseUrl + path, config);
	};

	var put = function(path, post) {
		return $http.put(baseUrl + path, post, config);
	};

	return {
		getPosts: function() {
			return get('/collections/' + collectionName + '/items');
		},
		savePost: function(post) {
			return put('/collections/' + collectionName + '/items/' + post.identifier, post);
		}
	};
}]);