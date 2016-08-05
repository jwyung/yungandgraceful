(function($) {
	var $examples = $('.example');
	var scrollFireSettings = {
		offset: $examples.innerHeight() * 3/4,
		timeout: {}
	};

	var options = [
		{
			selector: '.gaming-video',
			offset: scrollFireSettings.offset,
			callback: function(el) {
				videoScrollFireHandler($examples.find('.gaming-video')[0]);
			}
		},
		{
			selector: '.weirdness-video',
			offset: scrollFireSettings.offset,
			callback: function(el) {
				videoScrollFireHandler($examples.find('.weirdness-video')[0]);
			}
		},
		{
			selector: '.road-trip-video',
			offset: scrollFireSettings.offset,
			callback: function(el) {
				videoScrollFireHandler($examples.find('.road-trip-video')[0]);
			}
		}
	];

	function videoScrollFireHandler(video) {
		playVideo(video);
		video.playbackRate = 0.5;
		video.muted = true;

		scrollFireSettings.timeout[video.className] = setTimeout(function() {
			pauseVideo(video);
			video.playbackRate = 1;
			video.muted = false;
		}, 2000);
	}

	Materialize.scrollFire(options);


	$('.example')
		.on('click', '.play-btn', play)
		.on('click', '.example-video', pause)
		.on('mouseover', '.example-video', showControls)
		.on('mousedown', '.example-video', hideControls);

	function play() {
		var $example = $(this).closest('.example');
		var video = $example.find('.example-video')[0];

		clearTimeout(scrollFireSettings.timeout[video.className]);

		$.map($examples, function(example) {
			if ($(example).hasClass('playing')) {
				pause.call(example);
			}
		});

		$example.addClass('playing');
		playVideo(video);
	}

	function pause() {
		var $example = $(this).closest('.example');
		var video = $example.find('.example-video')[0];

		$example.removeClass('playing');
		pauseVideo(video);
		video.removeAttribute('controls');
	}

	function showControls() {
		if ($(this).closest('.playing').length) {
			this.setAttribute('controls', 'controls');
		}
	}

	function hideControls() {
		this.removeAttribute('controls');
	}

	function playVideo(video) {
		video.play();
		video.isPaused = false;
		video.playbackRate = 1;
		video.muted = false;
	}

	function pauseVideo(video) {
		video.pause();
		video.isPaused = true;
	}
}(jQuery));
