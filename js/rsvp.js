(function($) {
	var $rsvpForm = $('.rsvp-form');
	var $g1Item = $('.g1-item');
	var $g2Item = $('.g2-item');

	$rsvpForm.on('keyup', '.input-text', function(e) {
		var $guestFieldset = getGuestFieldset.call(this);
		var guest = getGuest($guestFieldset);
		var nameFilled = isNameFilled($guestFieldset);

		if (nameFilled) {
			$guestFieldset.find('input[name=' + guest + '-rsvp]').attr('disabled', false);

			$guestFieldset.find('.rsvp-content').removeClass('show-error');
		} else {
			$guestFieldset.find('input[name=' + guest + '-rsvp]').attr('disabled', true);
			$guestFieldset.find('input[name=' + guest + '-rsvp]').attr('checked', false);

			$guestFieldset.find('input[name=' + guest + '-entree]').attr('disabled', true);
			$guestFieldset.find('input[name=g1-entree]').attr('checked', false);
		}

		maybeEnableSubmitBtn($guestFieldset);
	});

	$rsvpForm.on('change', '.guest-item-radio', function(e) {
		maybeEnableSubmitBtn(getGuestFieldset.call(this));
	});

	$rsvpForm.on('change', '.item-rsvp', function(e) {
		var $guestFieldset = getGuestFieldset.call(this);
		var $entrees = $guestFieldset.find('.item-entree');

		if ($guestFieldset.find('.item-rsvp:checked').val() === 'yes') {
			$guestFieldset.find('.entree-content').removeClass('show-error');
			$entrees.attr('disabled', false);
		} else {
			$entrees.attr('disabled', true);
			$entrees.attr('checked', false);
		}
	});

	$rsvpForm.on('click', '.plus-one-btn', function(e) {
		$(this).addClass('hidden');
		$rsvpForm.find('.g2').addClass('show');
	});

	$rsvpForm.on('click', '.item-rsvp-label', function(e) {
		var $guestFieldset = getGuestFieldset.call(this);

		if (!isNameFilled($guestFieldset)) {
			$(this).closest('.guest-item-content').addClass('show-error');
		}
	});

	$rsvpForm.on('click', '.item-entree-label', function(e) {
		var $guestFieldset = getGuestFieldset.call(this);

		if (isAttendanceFilled($guestFieldset)) {
			$guestFieldset.find('.rsvp-not-selected').addClass('hidden');
			$guestFieldset.find('.rsvp-selected').removeClass('hidden');
		} else {
			$guestFieldset.find('.rsvp-not-selected').removeClass('hidden');
			$guestFieldset.find('.rsvp-selected').addClass('hidden');
		}

		if (!isAttending($guestFieldset)) {
			$(this).closest('.guest-item-content').addClass('show-error');
		}
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

	function getGuestFieldset() {
		return $(this).closest('.guest');
	}

	function getGuest($guestFieldset) {
		var classnames = $guestFieldset.attr('class');

		return classnames && classnames.split(' ')[0];		
	}


	function maybeEnableSubmitBtn($guestFieldset) {
		var verifiedName = isNameFilled($guestFieldset);
		var verifiedAttendance = isAttendanceFilled($guestFieldset);
		var verifiedEntree = isAttending($guestFieldset) ? isEntreeFilled($guestFieldset) : true;

		$rsvpForm.find('.rsvp-btn').attr('disabled', !(verifiedName && verifiedAttendance && verifiedEntree));
	}

	function isNameFilled($guestFieldset) {
		return $guestFieldset.find('.first-name-field').val() && $guestFieldset.find('.last-name-field').val();
	}

	function isAttendanceFilled($guestFieldset) {
		var guest = getGuest($guestFieldset);

		return !!$guestFieldset.find('[name=' + guest + '-rsvp]:checked').val();
	}

	function isAttending($guestFieldset) {
		var guest = getGuest($guestFieldset);

		return $guestFieldset.find('[name=' + guest + '-rsvp]:checked').val() === 'yes';	
	}

	function isEntreeFilled($guestFieldset) {
		var guest = getGuest($guestFieldset);

		return !!$guestFieldset.find('[name=' + guest + '-entree]:checked').val();
	}

}(jQuery));
