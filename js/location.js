(function($) {

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
