
angular.module('croccodilli.controllers')

.controller('MakingOfController', ['$scope', '$timeout', 'postService', function($scope, $timeout, postService) {

	$scope.showLoading();
	postService.getLastMakingOf().success(function(posts) {
		$scope.posts = $scope.optimizePostOrder(posts);
		$timeout($scope.scaleImages);
		$scope.hideLoading();
	});

	$scope.videoSettings = {
		showinfo: 0,
		controls: 0,
		cc_load_policy: 0,
		iv_load_policy: 3,
		loop: 1,
		modestbranding: 1,
		rel: 0
	};

	$scope.canLoadMore = true;

	$scope.getMoreMakingOf = function() {
		postService.getOlderMakingOf().success(function(posts) {
			if(posts.length == 0) {
				$scope.canLoadMore = false;
			} else {
				for(var i=0; i<posts.length; i++) {
					$scope.posts.push(posts[i]);
				}
				$scope.posts = $scope.optimizePostOrder($scope.posts);
			}
			$timeout($scope.scaleImages);
		});
	};

	$scope.optimizePostOrder = function(posts) {
		var optimizedPosts = [];
		var spaceLeft = 3;
		var leftBehind = [];

		for(var i=0; i<posts.length; i++) {
			if(spaceLeft == 0) {
				spaceLeft = 3;
			}

			if(leftBehind.length > 0) {
				if($scope.isWide(leftBehind[leftBehind.length-1])) {
					if(spaceLeft >= 2) {
						optimizedPosts.push(leftBehind.shift());
						spaceLeft-=2;
					}
				} else {
					optimizedPosts.push(leftBehind.shift());
				}
			}

			if(spaceLeft > 0) {
				if($scope.isWide(posts[i])) {
					if(spaceLeft >= 2) {
						optimizedPosts.push(posts[i]);
						spaceLeft-=2;
					} else {
						leftBehind.push(posts[i]);
					}
				} else {
					if(spaceLeft >= 1) {
						optimizedPosts.push(posts[i]);
						spaceLeft-=1;
					}
				}
			} else {
				leftBehind.push(posts[i]);
			}
		}

		for(var i=0; i<leftBehind.length; i++) {
			if(optimizedPosts.length > 2
				&& !$scope.isWide(optimizedPosts[optimizedPosts.length-1])
				&& !$scope.isWide(optimizedPosts[optimizedPosts.length-2])) {
				var smallPost1 = optimizedPosts[optimizedPosts.length-1];
				var smallPost2 = optimizedPosts[optimizedPosts.length-2];
				optimizedPosts[optimizedPosts.length-2] = leftBehind[i];
				optimizedPosts[optimizedPosts.length-1] = smallPost2;
				optimizedPosts.push(smallPost1);
				if(i+1<leftBehind.length) {
					optimizedPosts.push(leftBehind[i+1]);
					i++;
				}
			} else {
				optimizedPosts.push(leftBehind[i]);
			}
		}

		return optimizedPosts;
	};

	$scope.isWide = function(post) {
		return postService.isWide(post);
	};

	$scope.getPostType = function(post) {
		return postService.getPostType(post);
	};
}]);