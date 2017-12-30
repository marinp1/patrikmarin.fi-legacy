$(document).ready(function() {
	$('body').on('click', '#selector', function() {
		$("#dropbar").slideToggle();
	});

	$(document).on('click', '#dropbar li', function(e) {
		var target = $(this).attr("href");
		var div = $("#" + target);
		$('html, body').animate({
			scrollTop: div.offset().top - 50
		}, 500, 'swing');
	});

	$(document).on('click', '#today', function(e) {
    var passkey = sanitizeString(prompt("Taikasana, kiitos:"));
    if (passkey !== null) {
	    $("#overlay").toggle();
			$.ajax({
			  url: "/js/forceupdate.php",
			  type: "post",
			  data: {keyword: passkey},
			  complete: function(response){
					$("#overlay").toggle();
			  	var res = response.responseText;
			  	if (res.indexOf("Tietokanta") > -1) {
						eval(res);
						window.location.reload(true);
			  	} else {
			  		eval(res);
			  	}
			  }
			});
    };
	});

	$(document).on("click", "#settings-btn", function(e) {
	  //$('.container nav').addClass("slideleft");
	  //$('#content').addClass("slideleft");
	  $('#settings-box').toggleClass("slideleft");
	  //$("body").addClass("hide-scroll");
	});

	$(document).on("click", ".day", function() {
		$(".day-selected").removeClass("day-selected");
		$(this).addClass("day-selected");
	});

	function sanitizeString(str){
		if (str !== null) {
			str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
			str.trim();
		}
    return str;
	}
	var notif;
	$(document).on("click", "#notify-btn", function() {
		if (window.Notification && Notification.permission !== "granted") {
			Notification.requestPermission(function (status) {
				if (Notification.permission !== status) {
					Notification.permission = status;
				}
			});
		}
    if (window.Notification && Notification.permission === "granted") {
    	notify();
    	clearInterval(notif);
    	notif = setInterval(notify, 43200000);
		}
		else if (window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission(function (status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
        // If the user said okay
        if (status === "granted") {
        	notify();
        	clearInterval(notif);
        	notif = setInterval(notify, 43200000);
        }
      });
    }
	});

	function notify() {
		var subarray = ['Kana Fajita', 'Kananrinta', 'Spicy Italian', 'American Steakhouse Melt', 'Kalkkuna', 'Vegepihvi', 'Kinkku']
		var today = new Date().getDay();
		var n = new Notification("Päivän subi:", {
			body: subarray[today]
		});
	}
});
