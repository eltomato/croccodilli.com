
angular.module('croccodilli.services')
.service('slidesService', ['$q', '$sce', function($q, $sce) {

	var file_id = '1f9px9fHnjagBJke6aprpyMPmh3CWreDAaMXFpbwdtA0';
	var worksheet_id = '0';

	return {
		getSlides: function() {
			var deferred = $q.defer();
			
			blockspring.runParsed(
				"read-worksheet-google-sheets", {
					"file_id": file_id,
					"worksheet_id": worksheet_id,
					"has_header": true
				}, {
					"api_key": "br_24567_318823f6f4e8ac9b7b45d6beac65627f82047241"
				}, function(res) {
					var slides = [];
					if(!angular.isUndefined(res.params.data)) {
						var rawSlides = res.params.data;
						for(var i=0; i<rawSlides.length; i++) {
							slides.push({
								id: parseInt(rawSlides[i].id),
								date: moment(rawSlides[i].date).tz('Europe/Rome').format('DD/MM/YYYY'),
								videoId: rawSlides[i].videoId,
								background: rawSlides[i].background,
								content: $sce.trustAsHtml(rawSlides[i].content),
								title: rawSlides[i].title,
							});
						}
					}
					slides.reverse();
					deferred.resolve(slides);
				});

			return deferred.promise;
		},
		save: function(slide) {
			var deferred = $q.defer();

			blockspring.runParsed(
				"append-to-google-spreadsheet", {
					"file_id": file_id,
					"worksheet_id": worksheet_id,
					"values": [[slide.id, slide.videoId, slide.background, slide.content, slide.title]]
				},{
					"api_key": "br_24567_c5297836d2d26f1c73f111fff03f51a4478553e5"
				}, function(res) {
					deferred.resolve(true);
			});

			return deferred.promise;
		}
	};
}]);