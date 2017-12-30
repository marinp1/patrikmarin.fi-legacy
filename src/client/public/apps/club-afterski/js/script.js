$(document).ready(function() {
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
		var target_date = new Date("Mar 26, 2015 20:00:00").getTime();
		var isNegative = false;
		var days, hours, minutes, seconds;
		var countdown = $("#countdownH");
		setInterval(function () {
		 
			var current_date = new Date().getTime();
			var seconds_left = (target_date - current_date) / 1000;
		 
			days = parseInt(seconds_left / 86400);
			seconds_left = seconds_left % 86400;
			
			hours = parseInt(seconds_left / 3600);
			seconds_left = seconds_left % 3600;
			 
			minutes = parseInt(seconds_left / 60);
			seconds = parseInt(seconds_left % 60);
			
			if (seconds_left < 0) {
				isNegative = true;
			}
			 
			var timeArray = [Math.abs(days).toString(),Math.abs(hours).toString(),Math.abs(minutes).toString(),Math.abs(seconds).toString()];
		
			for (i=0;i<timeArray.length;i++) {
				while (timeArray[i].length < 2) {
					timeArray[i] = "0" + timeArray[i];
				}
			}
			if (isNegative) {
				timeArray[0] = "-" + timeArray[0];
			}
			
			countdown.text(timeArray[0] + ":" + timeArray[1] + ":" + timeArray[2] + ":" +timeArray[3]);
	}, 1000);
	$('#header').css("height", $(window).height());
	var $nav = $('#navmenu');
	var $navLi = $('#navmenu li');
	
	$('button').click(function() {
		if (!$nav.hasClass('forceDisplay')) {
			$nav.addClass('forceDisplay')
			$navLi.addClass('forceDisplay');
		} else {
			$nav.removeClass('forceDisplay')
			$navLi.removeClass('forceDisplay');
		}
	});
	
	$('a').click(function(){
		$nav.removeClass('forceDisplay')
		$navLi.removeClass('forceDisplay');
		var target = $(this).attr('href');
		var menuheight = $('#navbar').height();
		var toscroll = $(target).offset().top;
		if (target != "#sponssit") {
			toscroll = $(target + ' h1').offset().top;
		} else {
			toscroll = $(target).offset().top;
		}
		$('html, body').animate({
			scrollTop: toscroll
		}, 1500, 'swing');
		
		return false;
	});
	
	function clear() {
		if ($nav.hasClass('forceDisplay')) {
			$nav.removeClass('forceDisplay')
			$navLi.removeClass('forceDisplay');
		}
	}
	
	$(window).resize(function() {
		if (isMobile == false) {
			$('#header').css("height", $(window).height());
			clear();
		}
	});
	
	$(window).scroll(function () {
		clear();
/* 		if (isMobile == false) {
			$("body").css("background-position","50% " + ($(this).scrollTop() / 4) + "px");
		} */
	});
});