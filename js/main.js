
$(window).on("load", function() {
	var doLoading = function() {
		$(".loader-wrapper").fadeOut("slow");
	};
	setTimeout(doLoading, 1250);
});

new WOW().init();

$(window).on("orientationchange",function(event){
	$("img.scale").imageScale();
});

$(function() {

	/* Scroll to top */
	$(window).scroll(function() {
		($(this).scrollTop() > 300) ? $("a#scroll-to-top").addClass('visible'): $("a#scroll-to-top").removeClass('visible');
	});

	$("a#scroll-to-top").click(function() {
		$("html, body").animate({
			scrollTop: 0
		}, "slow");
		return false;
	});

});
