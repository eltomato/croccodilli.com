
angular.module('croccodilli.services').service('postService', ['$http', '$q', function($http, $q) {
	var file_id = '1sQixJW9vNR5lm_SINWQUdAXufhX4LIvnBY5jzIgsKCc';
	var worksheet_id = '0';

	return {
		getPosts: function() {
			var deferred = $q.defer();
			blockspring.runParsed(
				"read-worksheet-google-sheets", {
					"file_id": file_id,
					"worksheet_id": worksheet_id,
					"has_header": true
				}, {
					"api_key": "br_24567_318823f6f4e8ac9b7b45d6beac65627f82047241"
				}, function(res) {
					console.log(res);
					var posts = [];
					if(!angular.isUndefined(res.params.data)) {
						for(var i=0; i<res.params.data.length; i++) {
							posts.push({
								poster: res.params.data[i].poster,
								posterImageUrl: res.params.data[i].posterImageUrl,
								content: res.params.data[i].content
							});
						}
					}
					deferred.resolve(posts);
				}
			);
			return deferred.promise;
		},
		savePost: function(post) {
			var defer = $q.defer();
			blockspring.runParsed(
				"append-to-google-spreadsheet", {
					"file_id": file_id,
					"worksheet_id": worksheet_id,
					"values": [[post.poster, post.posterImageUrl, post.content]]
				},{
					"api_key": "br_24567_c5297836d2d26f1c73f111fff03f51a4478553e5"
				}, function(res) {
					console.log(res);
					if(res.params && res.params.status) {
						defer.resolve(true);
					} else {
						defer.resolve(false);
					}
				}
			);
			return defer.promise;
		}
	};
}]);