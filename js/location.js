(function($) {

	if (!isMobile) {
		var iframe = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9757.14257132941!2d-117.72725999457192!3d33.47664931218067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcf06ca0fe46f5%3A0xabbcf4141d8d9eab!2s1+Ritz+Carlton+Dr%2C+Dana+Point%2C+CA+92629!5e0!3m2!1sen!2sus!4v1470790400957" width="800" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>';

		$('.ritz-map-modal').find('.modal-content').prepend(iframe);
	}

	$('.location')
		.on('click', '.view-map-btn', function(e) {
			$('.ritz-map-modal').addClass('show');
			$('html').addClass('modal-visible');
		});

	$('.ritz-map-modal').on('click', function(e) {
			$('.ritz-map-modal').removeClass('show');
			$('html').removeClass('modal-visible');
		});
}(jQuery));
