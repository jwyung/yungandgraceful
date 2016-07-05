(function($) {
	var $rsvpForm = $('.rsvp-form');

	$rsvpForm.on('submit', function(e) {
		$.ajax({
			url: atob('aHR0cHM6Ly9mb3Jtc3ByZWUuaW8veXVuZ2FuZGdyYWNlZnVsQGdtYWlsLmNvbQ=='),
			method: 'POST',
			data: $(this).serialize(),
			dataType: 'json',
			success: function() {
				console.log('success!');
			}
		});

		return false;
	});
}(jQuery));
