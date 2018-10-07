(function ($) {
    $.fn.switchPopup = function (btn, time, overflow) {
        var $popup = this;
        $(document).on('click', btn, function () {
            var $scrollWidth = window.innerWidth - document.documentElement.clientWidth
            var $time = typeof time === 'number' ? time : 300;
			var $overflow = typeof overflow !== 'undefined' ? overflow : true;

            function closePopup(popup) {
                popup.removeClass('visible');
                setTimeout(function () {
                    popup.removeClass('display');
					if($overflow) {
						$('html').css({
							'padding-right': 0,
							'overflow': 'auto'
						});
					}
                }, $time);
            }

            if ($popup.hasClass('display')) {
                closePopup($popup);
            }

            if (!$popup.hasClass('display')) {
                $popup.addClass('display');
                setTimeout(function () {
                    $popup.addClass('visible');
                }, 1);
				if($overflow) {
					$('html').css({
						'padding-right': $scrollWidth,
						'overflow': 'hidden'
					});
				}
            }

            setTimeout(function () {
                if ($('.popup.display.visible').length > 1) {
                    closePopup($('.popup').not($popup));
                }
            }, 2);
        });
    };
})(jQuery);

$(function() {
	/* ИМГ В СВГ */
	$('img.img-svg').each(function(){
		var $img = $(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		$.get(imgURL, function(data) {
			var $svg = $(data).find('svg');

			if(typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}

			if(typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass+' replaced-svg');
			}

			$svg = $svg.removeAttr('xmlns:a');

			if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
			}

			$img.replaceWith($svg);

		}, 'xml');
	});
	
//  Пример создания попапа
//	$('.popup').switchPopup('.js-tgl-popup', 300);
});

