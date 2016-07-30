(function($) {
	var $rsvpForm = $('.rsvp-form');

	var $g1FirstName = $('#g1-first-name');
	var $g1LastName = $('#g1-last-name');
	var $g1Item = $('.g1-item');

	var $g2FirstName = $('#g2-first-name');
	var $g2LastName = $('#g2-last-name');
	var $g2Item = $('.g2-item');

	$rsvpForm.on('keyup', '#g1-first-name, #g1-last-name', function(e) {
		$g1Item.attr('disabled', !( $g1FirstName.val() && $g1LastName.val() ));
	});

	$rsvpForm.on('keyup', '#g2-first-name, #g2-last-name', function(e) {
		$g2Item.attr('disabled', !( $g2FirstName.val() && $g2LastName.val() ));
		$g2Item.attr('required', $g2FirstName.val() && $g2LastName.val() );
	});

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
