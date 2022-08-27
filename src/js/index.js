import {$, AirDatepicker} from './common';

// Календарь
if($('.js-calendar').length){
	new AirDatepicker('.js-calendar-main', {
		inline: true,
		dateFormat: 'dd MMMM-EEEE',
		range: true,
		classes: 'js-calendar-booking',
		onSelect({formattedDate}) {
			let $calendar = $('.js-calendar-booking').closest('.js-calendar');
			let dataArr = formattedDate[0].split('-');
			
			$calendar.find('.js-calendar-date-start').text(dataArr[0]);
			$calendar.find('.js-calendar-day-start').text(dataArr[1]);

			if(formattedDate.length > 1){
				dataArr = formattedDate[1].split('-');
	
				$calendar.find('.js-calendar-date-end').text(dataArr[0]);
				$calendar.find('.js-calendar-day-end').text(dataArr[1]);
			}else{
				$calendar.find('.js-calendar-date-end').text('');
				$calendar.find('.js-calendar-day-end').text('');
			}
		}
	})
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
		$(this).data('val') = $(this).text();
		$(this).text(btnText);
		$(this).closest('.js-info').find('.js-info-desc').slideToggle(300);
	});
}
