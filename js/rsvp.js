(function($) {
	var $rsvpForm = $('.rsvp-form');

	var $g1FirstName = $('#g1-first-name');
	var $g1LastName = $('#g1-last-name');
	var $g1Item = $('.g1-item');
	var $g1GuestItem = $('.g1 .guest-item');

	var $g2FirstName = $('#g2-first-name');
	var $g2LastName = $('#g2-last-name');
	var $g2Item = $('.g2-item');


	$rsvpForm.on('keyup', '#g1-first-name, #g1-last-name', function(e) {
		$g1Item.attr('disabled', !( $g1FirstName.val() && $g1LastName.val() ));
		maybeEnableSubmitBtn($rsvpForm.find('.g1'));
	});

	$rsvpForm.on('keyup', '#g2-first-name, #g2-last-name', function(e) {
		$g2Item.attr('disabled', !( $g2FirstName.val() && $g2LastName.val() ));
		$g2Item.attr('required', $g2FirstName.val() && $g2LastName.val() );
	});

	$rsvpForm.find('.g1').on('change', '[name=g1-rsvp], [name=g1-entree]', function(e) {
		maybeEnableSubmitBtn($rsvpForm.find('.g1'));
	});

	$rsvpForm.on('click', '.plus-one-btn', function(e) {
		$(this).addClass('hidden');
		$rsvpForm.find('.g2').addClass('show');
	});

	$rsvpForm.on('submit', function(e) {
		// TODO: this is not ready yet. Let's not do anything
		return false;

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

	function maybeEnableSubmitBtn($guestFieldset) {
		$rsvpForm.find('.rsvp-btn').attr('disabled', !(isNameFilled($guestFieldset) && isAttendanceFilled($guestFieldset) && isEntreeFilled($guestFieldset)));
	}

	function isNameFilled($guestFieldset) {
		return $guestFieldset.find('.first-name-field').val() && $guestFieldset.find('.last-name-field').val();
	}

	function isAttendanceFilled($guestFieldset) {
		var guest = $guestFieldset.attr('class').split(' ')[0];

		return !!$guestFieldset.find('[name=' + guest + '-rsvp]:checked').val();
	}

	function isEntreeFilled($guestFieldset) {
		var guest = $guestFieldset.attr('class').split(' ')[0];

		return !!$guestFieldset.find('[name=' + guest + '-entree]:checked').val();
	}
}(jQuery));
