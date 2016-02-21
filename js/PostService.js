
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
						var rawPosts = res.params.data;
						var mappedPosts = {};
						for(var i=0; i<rawPosts.length; i++) {
							if(rawPosts[i].refer && rawPosts[i].refer.length > 0) {
								posts[mappedPosts[rawPosts[i].refer]].referred.push({
									identifier: rawPosts[i].identifier,
									refer: rawPosts[i].refer,
									email: rawPosts[i].email,
									date_it: moment(rawPosts[i].date).tz('Europe/Rome').format('DD/MM/YYYY HH:mm:ss'),
									date_au: moment(rawPosts[i].date).tz('Australia/Sydney').format('DD/MM/YYYY HH:mm:ss'),
									poster: rawPosts[i].poster,
									posterImageUrl: rawPosts[i].posterImageUrl,
									content: rawPosts[i].content
								});
							} else {
								var post = {
									post: {
										identifier: rawPosts[i].identifier,
										refer: rawPosts[i].refer,
										email: rawPosts[i].email,
										date_it: moment(rawPosts[i].date).tz('Europe/Rome').format('DD/MM/YYYY HH:mm:ss'),
										date_au: moment(rawPosts[i].date).tz('Australia/Sydney').format('DD/MM/YYYY HH:mm:ss'),
										poster: rawPosts[i].poster,
										posterImageUrl: rawPosts[i].posterImageUrl,
										content: rawPosts[i].content
									},
									referred: []
								};
								posts.push(post);
								mappedPosts[rawPosts[i].identifier] = posts.indexOf(post);
							}
							console.log(posts);
							console.log(mappedPosts);
						}
					}
					posts.reverse();
					deferred.resolve(posts);
				}
			);
			return deferred.promise;
		},
		savePost: function(post) {
			var defer = $q.defer();
			var identifier = Math.random().toString(36).slice(2);
			var utcDate = moment.utc().format();
			blockspring.runParsed(
				"append-to-google-spreadsheet", {
					"file_id": file_id,
					"worksheet_id": worksheet_id,
					"values": [[identifier, post.refer, post.mail, utcDate, post.poster, post.posterImageUrl, post.content]]
				},{
					"api_key": "br_24567_c5297836d2d26f1c73f111fff03f51a4478553e5"
				}, function(res) {
					console.log(res);
					if(res.params && res.params.status) {
						defer.resolve({
							identifier: identifier,
							refer: post.refer,
							mail: post.mail,
							date_it: moment(utcDate).tz('Europe/Rome').format('DD/MM/YYYY HH:mm:ss'),
							date_au: moment(utcDate).tz('Australia/Sydney').format('DD/MM/YYYY HH:mm:ss'),
							poster: post.poster,
							posterImageUrl: post.posterImageUrl,
							content: post.content
						});
					} else {
						defer.resolve(false);
					}
				}
			);
			return defer.promise;
		}
	};
}]);