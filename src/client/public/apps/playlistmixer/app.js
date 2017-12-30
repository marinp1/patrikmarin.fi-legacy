window.onload = function() {

var client_id = '5a6a551ae45c420fbf65e731b62a2aa1';
var redirect_uri = 'https://www.patrikmarin.fi/web/playlistmixer/app';
var scopes = 'user-read-private playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private';

/* Redirect to Spotify authorization */
function login() {
	var state = randomString(15);
	var url = 'https://accounts.spotify.com/authorize?client_id=' + client_id +
		'&response_type=token' +
		'&scope=' + encodeURIComponent(scopes) +
		'&redirect_uri=' + encodeURIComponent(redirect_uri) +
		'&state=' + state;
	window.location.replace(url);
}
	
var info = [];
var selected = [];
var username = "";
var playlist = "";
var canclose = true;

/* RANDOM STRING GENERATOR */
function randomString(length) {
	var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var s = ""
	for (i=0;i<length;i++) {
		var index = Math.floor(Math.random() * chars.length);
		s += chars[index];
	}
	return s;
}

/* LOGIN WITH SPOTIFY */
$(document).on('click', '#loginbtn', function(){
	login();
})

/* CLOSE OVERLAY */
$(document).on('click', '#loadingoverlay', function(){
	if ($("#loaddone img").is(":visible")) {
		$("#loaddone img").hide();
		$(this).hide();
		info = [];
		selected = [];
		$("#playlists").empty();
		getPlaylists();
		getSelected();
	} else if(canclose == true) {
		$(this).hide();
	}
})

/* PLAYLIST SELECTION */
$(document).on('click', '.entry', function(){
	jQuery(this).find(".selected").toggle();
	$(this).toggleClass("active");
	getSelected();
})

/* PLAYLIST CREATION */
$(document).on('click', '#submit', function(){

	function shuffle(o){
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}

	var mergeSelected = [];
	
	for (i=0;i<selected.length;i++) {
		mergeSelected = mergeSelected.concat(selected[i].tracks);
	}

	var arr = {};

	for (i=0; i<mergeSelected.length; i++) {
		arr[mergeSelected[i]['uri']] = mergeSelected[i];
	}
	    
	mergeSelected = new Array();

	for (var key in arr) {
		mergeSelected.push(arr[key]);
	}

	var mergedtracks = [];

	for (i=0;i<mergeSelected.length;i++) {
		mergedtracks.push(mergeSelected[i].uri);
	}

	mergedtracks = shuffle(mergedtracks)


	var size = Math.ceil(mergedtracks.length / 100);

	var name = document.getElementById('playlistName').value.trim();
	document.getElementById('playlistName').value = name;

	/* Add max 100 songs to playlist */
	function addSongs(index, callback) {
		var start = index*100;		//start index for slice
		var count = 100;			//take next 100 elements
		var slicedtracks = mergedtracks.slice(start, start + count); 
		$.ajax({
			type: "POST",
			url: 'https://api.spotify.com/v1/users/' + username +  '/playlists/' + playlist + '/tracks',
			data: '{"uris": ' + JSON.stringify(slicedtracks) + '}',
			headers: {
				'Authorization': 'Bearer ' + access_token
			},
			success: function() {
				callback(index);
			}
		});
	}

	function songCallback(index) {
		if (index + 1 < size) {
			addSongs(index + 1, songCallback);
		} else {
			canclose = true;
			$("#loadingcontent").text("Playlist '" + name + "' created!");
			$("#loaddone img").show();
		}
	}

	/* First create playlist, on success add tracks */
	function createPlaylist() {
		$.ajax({
			type: "POST",
			data: "{\"name\":\"" + name + "\",\"public\":false}",
			url: 'https://api.spotify.com/v1/users/' + username +  '/playlists',
			headers: {
				'Authorization': 'Bearer ' + access_token
			},
			success: function(response) {
				playlist = response.id;
				canclose = false;
				$("#loaddone img").hide();
				$("#loadingoverlay").show();
				$("#loadingcontent").text("Adding songs...")
				addSongs(0, songCallback);
			}
		});
	}

	/* Create playlist only if there are any tracks */
	if (mergedtracks.length == 0) {
		$("#loadingcontent").text("Select playlists to be merged first.")
		$("#loadingoverlay").show();
	} else if (name == "") {
		$("#loadingcontent").text("Playlist's name cannot be empty.")
		$("#loadingoverlay").show();
	} else {
		createPlaylist();
	}
})

/* UPDATE SELECTION */
function getSelected() {
	selected = info.filter(function(el) {
		return $(".entry:eq("+el.index+")").hasClass("active");
	});

	var mergeSelected = [];
	for (i=0;i<selected.length;i++) {
		mergeSelected = mergeSelected.concat(selected[i].tracks);
	}

	var arr = {};

	for (i=0; i<mergeSelected.length; i++) {
		arr[mergeSelected[i]['uri']] = mergeSelected[i];
	}
	    
	mergeSelected = new Array();

	for (var key in arr) {
		mergeSelected.push(arr[key]);
	}

	var totalTracks = mergeSelected.length;
	var totalDur = 0;
	for (i=0;i<mergeSelected.length;i++) {
		totalDur += mergeSelected[i].dur;
	}
	var minutes = Math.floor(totalDur / 1000 / 60);
	var hours = Math.floor(minutes / 60);
	minutes = minutes - hours*60;

	var durationText = "";
	if (hours == 1) {
		durationText += hours + " hour and ";
	} else if (hours > 1) {
		durationText += hours + " hours and ";
	}
	if (minutes == 1) {
		durationText += minutes + " minute."
	} else {
		durationText += minutes + " minutes."
	}

	var trackcount = "";
	if (totalTracks.length == 1) {
		trackcount = " unique track"
	} else {
		trackcount = " unique tracks"
	}

	var playlistcount = "";
	if (selected.length == 1) {
		playlistcount = " playlist"
	} else {
		playlistcount = " playlists"
	}

	var selectedText = selected.length + playlistcount + " selected, with a total of " + totalTracks + trackcount + " and run time of " + durationText;
	$("#infotext").text(selectedText);

}

function getHashParams() {
	var hashParams = {};
	var e, r = /([^&;=]+)=?([^&;]*)/g,
		q = window.location.hash.substring(1);
	while ( e = r.exec(q)) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
	}
	return hashParams;
}

/* FETCH AND DISPLAY PLAYLISTS */
function getPlaylists() {
	var limit = 24;
	var playlistTemplate = document.getElementById('playlist-template').innerHTML
	var playlistTemplate = Handlebars.compile(playlistTemplate)
	function inner(offset) {
		$.ajax({
			url: 'https://api.spotify.com/v1/users/' + username +  '/playlists?limit=' + limit + '&offset=' + offset,
			headers: {
				'Authorization': 'Bearer ' + access_token
			},
			success: function(response) {
				var lists = response.items;
				if (lists.length % 3 == 0) {
					appendRow(lists.length / 3);
				} else if (lists.length % 3 == 1){
					var end = Math.floor(lists.length / 3);
					if (lists.length > 3) appendRow(end);
					$("#playlists").append($('<div class="row">'+ playlistTemplate(lists[lists.length - 1]) + '</div>'));
					getPlayTime(lists[lists.length - 1].id, lists.length - 1 + offset, lists[lists.length - 1].owner.id);
				} else {
					var end = Math.floor(lists.length / 3);
					if (lists.length > 3) appendRow(end);
					$("#playlists").append($('<div class="row">'+ playlistTemplate(lists[lists.length - 2]) + playlistTemplate(lists[lists.length - 1]) + '</div>'));
					getPlayTime(lists[lists.length - 2].id, lists.length - 2 + offset, lists[lists.length - 2].owner.id);
					getPlayTime(lists[lists.length - 1].id, lists.length - 1 + offset, lists[lists.length - 1].owner.id);
				}

				function appendRow(end) {
					for (i=0;i<end;i++) {
						var data1 = lists[i * 3];
						var data2 = lists[i * 3 + 1];
						var data3 = lists[i * 3 + 2];

						$("#playlists").append($('<div class="row">'+ playlistTemplate(data1) + playlistTemplate(data2) + playlistTemplate(data3) + '</div>'));

						getPlayTime(data1.id, i * 3 +	  offset, data1.owner.id);
						getPlayTime(data2.id, i * 3 + 1 + offset, data2.owner.id);
						getPlayTime(data3.id, i * 3 + 2 + offset, data3.owner.id);
					}
				}

				if (response.next !== null) {
					inner(offset + limit);
				}
			}
		});
	}
	inner(0);
}

/* On page load ask for login or show playlists */
var params = getHashParams();

var access_token = params.access_token,
	error = params.error;
	
if (error) {
	$("#loadingcontent").text("Error with authentication: " + error.message);
	$("#loaddone img").hide();
	$("#error img").show();
	$("#loadingoverlay").show();
	$('#login').show();
	$('#loggedin').hide();
} else {
	if (access_token) {
		$.ajax({
			url: 'https://api.spotify.com/v1/me',
			headers: {
				'Authorization': 'Bearer ' + access_token
			},
			success: function(response) {
				username = response.id;
				getPlaylists();
				$('#login').hide();
				$('#loggedin').show();
			}
		});
	} else {
		$('#login').show();
		$('#loggedin').hide();
	}
}

/* Get information about playlist */
function getPlayTime(id, toapply, ownerID) {
	var result = 0;
	var tracks = [];

	function getListData() {
		$.ajax({
			url: 'https://api.spotify.com/v1/users/' + ownerID +  '/playlists/' + id,
			headers: {
				'Authorization': 'Bearer ' + access_token
			},
			success: function(data) {
				if (data.images.length > 0) {
					var imgSrc = data.images[0].url;
					$('.compimg:eq('+toapply+')').attr('src', imgSrc);
				}
			}
		});
	}

	function getList(offset, callback) {
		$.ajax({
			url: 'https://api.spotify.com/v1/users/' + ownerID +  '/playlists/' + id + '/tracks?offset=' + offset,
			headers: {
				'Authorization': 'Bearer ' + access_token
			},
			success: function(response) {
				callback(response, offset);
			}
		});
	}

	function getListCallback(data, offset) {
		for (i=0;i<data.items.length;i++) {
			if (data.items[i].is_local == false) {
				tracks.push({uri: data.items[i].track.uri, dur: data.items[i].track.duration_ms});
				result += data.items[i].track.duration_ms;
			}
		}
		if (data.next == null) {	// loop until all tracks have been covered
			info.push({id: id, dur: result, index: toapply, total: tracks.length, tracks: tracks});
			var minutes = Math.floor((result / 1000) / 60);
			var hours = Math.floor(minutes / 60);
			minutes = minutes - hours * 60;
			var full = "";
			if (hours == 1) {
				full += hours + " hour, "
			} else if (hours > 1) {
				full += hours + " hours, "
			}
			if (minutes == 1) {
				full += minutes + " minute"
			} else {
				full += minutes + " minutes"
			}
			var trackcount = ""
			if (tracks.length == 1) {
				trackcount = "1 song"
			} else {
				trackcount = tracks.length + " songs"
			}
			$('.comptracks:eq('+toapply+')').text(trackcount);
			$('.complength:eq('+toapply+')').text(full);
		} else {
			getList(offset + 100, getListCallback);
		}
	}

	getList(0, getListCallback);

	getListData();

}

}