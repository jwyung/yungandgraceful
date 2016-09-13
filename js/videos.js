var $examples = $('.example');

$('.example')
	.on('click', '.play-btn', play)
	.on('click', '.video-mask', pause)
	.on('mouseover', '.example-video', showControls)
	.on('mousedown', '.example-video', hideControls);

function play() {
	var $example = $(this).closest('.example');
	var videoId = $(this).closest('.example').find('.example-video').attr('id');

	$.map($examples, function(example) {
		if ($(example).hasClass('playing')) {
			pause.call(example);
		}
	});

	$example.addClass('playing video-loaded');
	playVideo(videoId);
}

function pause() {
	var $example = $(this).closest('.example');
	var videoId = $(this).closest('.example').find('.example-video').attr('id');

	$example.removeClass('playing');
	pauseVideo(videoId);
}

function showControls() {
	if ($(this).closest('.playing').length) {
		this.setAttribute('controls', 'controls');
	}
}

function hideControls() {
	this.removeAttribute('controls');
}

function playVideo(videoId, playbackRate, muted) {
	var video = players[videoId];

	if (typeof video === 'object') {
		video.playVideo();
	}
}

function pauseVideo(videoId) {
	var video = players[videoId];

	if (typeof video === 'object') {
		video.pauseVideo();
	}
}

var players = {
	'gaming-video': null,
	'weirdness-video': null
};

var playersLoaded = {
	'gaming-video': false,
	'weirdness-video': false
};

function onYouTubeIframeAPIReady() {
	loadFirstVideo();
}

function loadFirstVideo() {
    players['gaming-video'] = new YT.Player('gaming-video', {
        videoId: 'fwuHoUH1Q-Y',
	suggestedQuality: 'highres',
        playerVars: {
            color: 'white',
            rel: 0,
            showinfo: 0,
            autoplay: 1
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}

function loadRemainingVideos() {
    players['weirdness-video'] = new YT.Player('weirdness-video', {
        videoId: 'zaPnteG4COI',
	suggestedQuality: 'highres',
        playerVars: {
            color: 'white',
            rel: 0,
            showinfo: 0,
            autoplay: 1
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}


function onPlayerReady(evt) {
}

function onPlayerStateChange(evt) {
	if (evt.data === YT.PlayerState.PLAYING) {
		var videoId = $(evt.target.a).attr('id');

		if (!playersLoaded[videoId]) {
			playersLoaded[videoId] = true;
			players[videoId].pauseVideo();
			$('.' + videoId).closest('.example').find('.play-btn').removeAttr('disabled');

			if (videoId === 'gaming-video') {
				loadRemainingVideos();
			}
		}
	}

	if (evt.data === YT.PlayerState.ENDED) {
		var videoId = $(evt.target.a).attr('id');

		players[videoId].playVideo();
		pause.call(evt.target.a);
	}
}
