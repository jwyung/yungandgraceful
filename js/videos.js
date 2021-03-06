var userAgent = navigator.userAgent;
var isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent));
var isSafari = (/(Safari)/i).test(userAgent) && !(/(Chrome)/i).test(userAgent);
var isOldSafari = isSafari && parseInt(userAgent.match(/Version\/(.*)\s/i)[1]) < 10;

var $html = $('html');
var $examples = $('.example');

var players = {
	'gaming-video': null,
	'weirdness-video': null,
	'proposal-video': null
};

var playersLoaded = {
	'gaming-video': false,
	'weirdness-video': false,
	'proposal-video': false
};

$('.example')
	.on('click', '.play-btn', play)
	.on('click', '.video-mask', pause)
	.on('mouseover', '.example-video', showControls)
	.on('mousedown', '.example-video', hideControls);

if (isMobile) {
	$html.addClass('is-mobile is-mobile-init');
	immediatelyReady();
}

if (isSafari) {
	$html.addClass('is-safari');
}

if (isOldSafari) {
	$html.addClass('is-old-safari');
}

function immediatelyReady() {
	for (var videoId in playersLoaded) {
		playersLoaded[videoId] = true;
		enablePlayButton(videoId);
	}
}

function showVideo() {
	$(this).closest('.example').addClass('playing video-loaded');
}

function hideVideo() {
	$(this).closest('.example').removeClass('playing');
}

function play() {
	var $example = $(this).closest('.example');
	var videoId = $(this).closest('.example').find('.example-video').attr('id');

	$.map($examples, function(example) {
		if ($(example).hasClass('playing')) {
			pause.call(example);
		}
	});

	showVideo.call(this);

	playVideo(videoId);
}

function pause() {
	var $example = $(this).closest('.example');
	var videoId = $(this).closest('.example').find('.example-video').attr('id');

	hideVideo.call(this);
	pauseVideo(videoId);
}

function enablePlayButton(videoId) {
	$('.' + videoId).closest('.example').find('.play-btn').removeAttr('disabled');
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

function onYouTubeIframeAPIReady() {
	loadFirstVideo();

	if (isMobile) {
		loadRemainingVideos();
	}
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
        videoId: 'XaoPhgW9t04',
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

    players['proposal-video'] = new YT.Player('proposal-video', {
        videoId: 'uUqxqRvBiqk',
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
	if (evt.data === YT.PlayerState.UNSTARTED) {
		if (isMobile) {
			$(evt.target.a).addClass('mobile-playing');
		}

		// Intermittently, the iframe is not positioned correctly before showVideo().
		// By ensuring class `mobile-playing` is applied before showVideo(), we always
		// have video positioned correctly first.
		setTimeout(function() {
			if ($html.hasClass('is-mobile-init')) {
				showVideo.call(evt.target.a);
			}

			$html.removeClass('is-mobile-init');
		}, 0);
	}

	if (evt.data === YT.PlayerState.PLAYING) {
		var videoId = $(evt.target.a).attr('id');

		if (!playersLoaded[videoId]) {
			playersLoaded[videoId] = true;
			players[videoId].pauseVideo();
			enablePlayButton(videoId);

			if (videoId === 'gaming-video') {
				loadRemainingVideos();
			}

			return;
		}

		if (isMobile) {
			$(evt.target.a).closest('.example').addClass('mobile-loaded');
		}
	}

	if (evt.data === YT.PlayerState.PAUSED) {
		var videoId = $(evt.target.a).attr('id');
		pause.call(evt.target.a);
	}

	if (evt.data === YT.PlayerState.ENDED) {
		var videoId = $(evt.target.a).attr('id');

		players[videoId].playVideo();

		pause.call(evt.target.a);
	}
}
