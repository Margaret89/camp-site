import {$, AirDatepicker, Fancybox, Inputmask} from './common';

// Календарь
if($('.js-calendar').length){
	new AirDatepicker('.js-calendar-main', {
		inline: true,
		dateFormat: 'dd MMMM EEEE',
		range: true,
		classes: 'js-calendar-booking',
		prevHtml: '<svg><path class="st0" d="M16,7v2H3.8l5.6,5.6L8,16L0,8l8-8l1.4,1.4L3.8,7H16z"/></svg>',
		nextHtml: '<svg><path class="st0" d="M8,0l8,8l-8,8l-1.4-1.4L12.2,9H0V7h12.2L6.6,1.4L8,0z"/></svg>',
		onSelect({formattedDate}) {
			let $calendar = $('.js-calendar-booking').closest('.js-calendar');
			let dataArr = formattedDate[0].split(' ');

			let months = {
				'Январь':'Января',
				'Февраль':'Февраля',
				'Март':'Марта',
				'Апрель':'Апреля',
				'Май':'Мая',
				'Июнь':'Июня',
				'Июль':'Июля',
				'Август':'Августа',
				'Сентябрь':'Сентября',
				'Октябрь':'Октября',
				'Ноябрь':'Ноября',
				'Декабрь':'Декабря',
			};

			console.log('dataArr[0] = ', dataArr[0]);
			console.log('months = ', months['Август']);

			
			$calendar.find('.js-calendar-date-start').text(dataArr[0]+' '+months[dataArr[1]]);
			$calendar.find('.js-calendar-day-start').text(dataArr[2]);

			if(formattedDate.length > 1){
				dataArr = formattedDate[1].split(' ');
	
				$calendar.find('.js-calendar-date-end').text(dataArr[0]+' '+months[dataArr[1]]);
				$calendar.find('.js-calendar-day-end').text(dataArr[2]);
			}else{
				$calendar.find('.js-calendar-date-end').text('');
				$calendar.find('.js-calendar-day-end').text('');
			}
		}
	})

	$('.js-calendar-field').on('click', function(){
		$(this).closest('.js-calendar').find('.js-calendar-main').toggleClass('open');
	});

	$(document).on('click', function (e) {
		if ($(e.target).closest('.js-calendar').length) {return;}
		// клик снаружи элемента
		$('.js-calendar-main').removeClass('open');
	});
}

// unwrap block
if($('.js-unwrap-block').length){
	$('.js-unwrap-head').on('click',function(event){
		event.preventDefault();
		var $parent = $(this).parents('.js-unwrap-block');
		
		$parent.toggleClass('opened');
		if($parent.hasClass('opened')){
			$parent.children('.js-unwrap-content').slideDown(400);
		}else{
			$parent.children('.js-unwrap-content').slideUp(400);
		}
	});
}

// Открыть/Закрыть информационный блок
if($('.js-info').length){
	$('.js-info-btn').on('click', function(){
		let btnText = $(this).data('val');
		$(this).data('val', $(this).text());
		$(this).text(btnText);
		$(this).closest('.js-info').find('.js-info-desc').slideToggle(300);
	});
}


// Слайдер галереи
if($('.js-slider-photo').length){
	$('.js-gallery-item').on('click', function(){
		Fancybox.show([{ src: "#popup-gallery", type: "inline" }]);

		if($('.js-slider-photo').hasClass('slick-initialized')){
			$('.js-slider-photo').slick('unslick');
		}

		if($('.js-slider-photo-thumb').hasClass('slick-initialized')){
			$('.js-slider-photo-thumb').slick('unslick');
		}

		$('.js-slider-photo').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: '<button id="prev" type="button" class="btn-arr btn-arr_left"><svg class="icon ic-arr-left ic-stroke" width="12" height="22"><use xlink:href="/assets/sprites/sprite.svg#ic-arr-left"></use></svg></button>',
			nextArrow: '<button id="next" type="button" class="btn-arr btn-arr_right"><svg class="icon ic-arr-right ic-stroke" width="12" height="22"><use xlink:href="/assets/sprites/sprite.svg#ic-arr-right"></use></svg></button>',
			fade: true,
			asNavFor: '.js-slider-photo-thumb',
		});

		$('.js-slider-photo-thumb').slick({
			slidesToShow: 7,
			slidesToScroll: 1,
			asNavFor: '.js-slider-photo',
			arrows: false,
			dots: true,
			// centerMode: true,
			focusOnSelect: true,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 5,
					}
				},
			]
		});

		$('.js-slider-photo').slick('slickGoTo', $(this).data('item'));

		$('.js-slider-photo-count').text($('.js-slider-photo').slick("getSlick").slideCount);

		$('.js-slider-photo').on("afterChange", function(event, slick, currentSlide, nextSlide){
			let curSlide = currentSlide + 1;

			if(curSlide < 10){
				curSlide = '0'+ curSlide;
			}

			$('.js-slider-photo-count-cur').text(curSlide);
		});

		if($(this).data('item') == 0){
			$('.js-slider-photo-count-cur').text('01');
		}
	});
}

// Слайдер отзывов
if($('.js-review-slider').length){
	$('.js-review-slider').slick({
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 2,
		dots: true,
		prevArrow: '<button id="prev" type="button" class="btn-arr btn-arr_left"><svg class="icon ic-arr-left ic-stroke" width="12" height="22"><use xlink:href="/assets/sprites/sprite.svg#ic-arr-left"></use></svg></button>',
		nextArrow: '<button id="next" type="button" class="btn-arr btn-arr_right"><svg class="icon ic-arr-right ic-stroke" width="12" height="22"><use xlink:href="/assets/sprites/sprite.svg#ic-arr-right"></use></svg></button>',
		appendArrows: $('.js-btn-review-slider'),
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
		]
	});
}

// Открыть/Закрыть мобильное меню
$('.js-open-menu').on('click',function(){
	$(this).toggleClass('active');
	$('.js-header-wrap').toggleClass('open');
	$('.js-body').toggleClass('no-scroll');
});

// Маска для телефона
Inputmask('+7 (999) 999-9999').mask('.js-phone');