(function($) {
	var $rsvpForm = $('.rsvp-form');

	$rsvpForm.on('submit', function(e) {
		$rsvpForm.addClass('submitted');
		var $spinner = $('.spinner .preloader-wrapper').addClass('active show');

		$.ajax({
			url: atob('aHR0cHM6Ly9mb3Jtc3ByZWUuaW8veXVuZ2FuZGdyYWNlZnVsQGdtYWlsLmNvbQ=='),
			method: 'POST',
			data: $(this).serialize(),
			dataType: 'json',
			success: function() {
				$spinner.removeClass('show');
				$('.confirmation').addClass('show');
			}
		});

		return false;
	});
}(jQuery));
