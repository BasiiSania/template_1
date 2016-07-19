
$(document).ready(function(e) {
	$('.with-hover-text, .regular-link').click(function(e){
		e.stopPropagation();
	});
	
	/***************
	* = Hover text *
	* Hover text for the last slide
	***************/
	$('.with-hover-text').hover(
		function(e) {
			$(this).css('overflow', 'visible');
			$(this).find('.hover-text')
				.show()
				.css('opacity', 0)
				.delay(200)
				.animate(
					{
						paddingTop: '25px',
						opacity: 1
					},
					'fast',
					'linear'
				);
		},
		function(e) {
			var obj = $(this);
			$(this).find('.hover-text')
				.animate(
					{
						paddingTop: '0',
						opacity: 0
					},
					'fast',
					'linear',
					function() {
						$(this).hide();
						$( obj ).css('overflow', 'hidden');
					}
				);
		}
	);
	
	var img_loaded = 0;
	var j_images = [];
	
	/*************************
	* = Controls active menu *
	* Hover text for the last slide
	*************************/
	$('#slide-3 img').each(function(index, element) {
		var time = new Date().getTime();
		var oldHref = $(this).attr('src');
		var myImg = $('<img />').attr('src', oldHref + '?' + time );
		
		myImg.load(function(e) {
			img_loaded += 1;;
			if ( img_loaded == $('#slide-3 img').length ) {
				$(function() {
					var pause = 10;
					$(document).scroll(function(e) {
						delay(function() {
							
							var tops = [];
							
							$('.story').each(function(index, element) {
								tops.push( $(element).offset().top - 200 );
							});
				
							var scroll_top = $(this).scrollTop();
							
							var lis = $('.nav > li');
							
							for ( var i=tops.length-1; i>=0; i-- ) {
								if ( scroll_top >= tops[i] ) {
									menu_focus( lis[i], i+1 );
									break;
								}
							}
						},
						pause);
					});
					$(document).scroll();
				});
			}
		});
	});
	
});

/******************
* = Gallery width *
*****************
$(function() {
	var pause = 50; // will only process code within delay(function() { ... }) every 100ms.
	$(window).resize(function() {
		delay(function() {
				var gallery_images = $('#slide-3 img');
				
				var images_per_row = 0;
				if ( gallery_images.length % 2 == 0 ) {
					images_per_row = gallery_images.length / 2;
				} else {
					images_per_row = gallery_images.length / 2 + 1;
				}
				
				var gallery_width = $('#slide-3 img').width() * $('#slide-3 img').length;
				gallery_width /= 2;
				if ( $('#slide-3 img').length % 2 != 0 ) {
					gallery_width += $('#slide-3 img').width();
				}
				
				$('#slide-3 .row').css('width', gallery_width );
				
				var left_pos = $('#slide-3 .row').width() - $('body').width();
				left_pos /= -2;
				
				$('#slide-3 .row').css('left', left_pos);
			
			},
			pause
		);
	});
	$(window).resize();
});
*/


var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();

function menu_focus( element, i ) {
	if ( $(element).hasClass('active') ) {
		if ( i == 6 ) {
			if ( $('.navbar').hasClass('inv') == false )
				return;
		} else {
			return;
		}
	}
	
	enable_arrows( i );
		
	if ( i == 1 || i == 6 )
		$('.navbar').removeClass('inv');
	else
		$('.navbar').addClass('inv');
	
	$('#nav-menu > li').removeClass('active');
	$(element).addClass('active');
	
	var icon = $(element).find('.icon');
	
	var left_pos = icon.offset().left - $('#nav-menu').offset().left;
	var el_width =  $(element).find('.text').width();
	
	$('.active-menu').stop(false, false).animate(
		{
			left: left_pos,
			width: el_width
		},
		1500,
		'easeInOutQuart'
	);
}

function enable_arrows( dataslide ) {
	$('#arrows div').addClass('disabled');
	if ( dataslide != 1 ) {
		$('#arrow-up').removeClass('disabled');
	}
	if ( dataslide != 6 ) {
		$('#arrow-down').removeClass('disabled');
	}
	if ( dataslide == 3 ) {
		$('#arrow-left').removeClass('disabled');
		$('#arrow-right').removeClass('disabled');
	}
}

/*************
* = Parallax *
*************/
jQuery(document).ready(function ($) {
	//Cache some variables
	var links = $('#nav-menu').find('li');
	slide = $('.slide');
	button = $('.button');
	mywindow = $(window);
	htmlbody = $('html,body');
	
	//Create a function that will be passed a slide number and then will scroll to that slide using jquerys animate. The Jquery
	//easing plugin is also used, so we passed in the easing method of 'easeInOutQuint' which is available throught the plugin.
	function goToByScroll(dataslide) {
		var offset_top = ( dataslide == 1 ) ? '0px' : $('.slide[data-slide="' + dataslide + '"]').offset().top;
		
		htmlbody.stop(false, false).animate({
			scrollTop: offset_top
		}, 1500, 'easeInOutQuart');
	}
	
	//When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
	links.click(function (e) {
		e.preventDefault();
		dataslide = $(this).attr('data-slide');
		goToByScroll(dataslide);
		$(".nav-collapse").collapse('hide');
	});
	
	//When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
	$('.navigation-slide').click(function (e) {
		e.preventDefault();
		dataslide = $(this).attr('data-slide');
		goToByScroll(dataslide);
		$(".nav-collapse").collapse('hide');
	});
});

/***************
* = Menu hover *
***************
jQuery(document).ready(function ($) {
	//Cache some variables
	var menu_item = $('.nav').find('li');
	
	menu_item.hover(
		function(e) {
			var icon = $(this).find('.icon');
			
			var left_pos = icon.offset().left - $('.nav').offset().left;
			var el_width = $(this).find('.text').width();
			
			var hover_bar = $('<div class="active-menu special-active-menu"></div>')
				.css('left', left_pos)
				.css('width', el_width)
				.attr('id', 'special-active-menu-' + $(this).data('slide') );
			
			$('.active-menu').after( hover_bar );
		},
		function(e) {
			$('.special-active-menu').remove();
		}
	);
});
*/

/******************
* = Gallery hover *
******************/
jQuery(document).ready(function ($) {
	//Cache some variables
	var images = $('#slide-3 a');
	
	images.hover(
		function(e) {
			var asta = $(this).find('img');
			$('#slide-3 img').not( asta ).stop(false, false).animate(
				{
					opacity: .5
				},
				'fast',
				'linear'
			);
			var zoom = $('<div class="zoom"></div>');
			if ( $(this).hasClass('video') ) {
				zoom.addClass('video');
			}
			$(this).prepend(zoom);
		},
		function(e) {
			$('#slide-3 img').stop(false, false).animate(
				{
					opacity: 1
				},
				'fast',
				'linear'
			);
			$('.zoom').remove();
		}
	);
});

/******************
* = Arrows click  *
******************/
jQuery(document).ready(function ($) {
	var arrows = $('#arrows div');
	
	arrows.click(function(e) {
		e.preventDefault();
		
		if ( $(this).hasClass('disabled') )
			return;
		
		var slide = null;
		var datasheet = $('.nav > li.active').data('slide');
		var offset_top = false;
		var offset_left = false;
		
		
		switch( $(this).attr('id') ) {
			case 'arrow-up':
				offset_top = ( datasheet - 1 == 1 ) ? '0px' : $('.slide[data-slide="' + (datasheet-1) + '"]').offset().top;
				break;
			case 'arrow-down':
				offset_top = $('.slide[data-slide="' + (datasheet+1) + '"]').offset().top;
				break;
			case 'arrow-left':
				offset_left = $('#slide-3 .row').offset().left + 452;
				if ( offset_left > 0 ) {
					offset_left = '0px';
				}
				break;
			case 'arrow-right':
				offset_left = $('#slide-3 .row').offset().left - 452;
				if ( offset_left < $('body').width() - $('#slide-3 .row').width() ) {
					offset_left = $('body').width() - $('#slide-3 .row').width();
				}
				break;
		}
		
		if ( offset_top != false ) {
			htmlbody.stop(false, false).animate({
				scrollTop: offset_top
			}, 1500, 'easeInOutQuart');
		}
		
		if ( offset_left != false ) {
			if ( $('#slide-3 .row').width() != $('body').width() ) {
				$('#slide-3 .row').stop(false, false).animate({
					left: offset_left
				}, 1500, 'easeInOutQuart');
			}
		}
	});
    
    //Далі мої скрипти
    var myform =  document.getElementById('mainform');
    var mail_part = 210;
    myform.setAttribute('action', 'https://formspree.io/' + 'bereg' + 'ovoi0' + mail_part.toString() + '@' + 'gmail' + '.' + 'com');
//    myform.setAttribute('action', 'https://formspree.io/' + 'ba' + 'syanya' + '@' + 'ukr' + '.' + 'net');
    myform =  document.getElementById('contactform');
    myform.setAttribute('action', 'https://formspree.io/' + 'bereg' + 'ovoi0' +mail_part.toString() + '@' + 'gmail' + '.' + 'com');
//    myform.setAttribute('action', 'https://formspree.io/' + 'ba' + 'syanya' + '@' + 'ukr' + '.' + 'net');
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {    dd = '0'+dd;} 
    if(mm<10) {    mm = '0'+mm;} 
    var today_txt = mm+'.'+dd+'.'+yyyy;
     $('#mydatepicker .input-group.date').datepicker({
            format: "MM dd - DD",
            startDate: today_txt,
            language: "uk",
            orientation: "bottom left",
            daysOfWeekDisabled: "0",
            autoclose: true,
            todayHighlight: true,
            showOnFocus: false
        });
    
    $("#menu-zviazok").click(function(){ //  for ontop window -ЗВ'ЯЗОК-
        $('#zviazok-slide').attr('style', '');
        $('#zviazok-slide').css('display', 'block');
        $('.navbar-fixed-top').css('z-index', '10');
    });  
    $('#zviazok-slide').css('display', 'none');
    $("#zviazok-slide-close").click(function(){
        $('#zviazok-slide').css({
            'display': 'none'});
        $('.navbar-fixed-top').attr('style', '');
    });
});//end of jQuery(document).ready(function ($){

$(window).scroll(function() {
    //After scrolling 50px from the top...
    if ( $(window).scrollTop() >= 50 ) {
        $('#arrows').css({
            'opacity': '0'
        });
    } else {
        $('#arrows').attr('style', '');}
    //After scrolling 630px from the top...
    if ( $(window).scrollTop() >= 630 ) {
        $('#zamovyty-btn').css({
            'color': '#ffffff',
            'border': '3px solid #ffffff',
            'top': '-25px'
        });
        $('#phone-number').css({
            'color': '#ffffff',
            'background-position': '2px -76px'
        });
    } else {
        $('#zamovyty-btn, #phone-number').attr('style', '');

    }
});

//slide-3
$('.nasha-woda-row-2 .col-lg-3').on('mouseover', function() {
  $(this).find('svg').children().css('fill','#3AADE3');
});
$('.nasha-woda-row-2 .col-lg-3').on('mouseleave', function() {
  $(this).find('svg').children().attr('style', '');
});

$('.bottle svg').click(function(){
  var val = $(this).parent().find('svg').length;
    $('#number-tsina').attr('value', val.toString());
    zminaTsina(val);
    return true;
});

function zminaTsina(val) {
    var vartist_num = val*35;
    document.getElementById('textTsina').innerHTML = vartist_num.toString();
    $('.bottle svg').attr('style','');
    if (val<=8){
        $('.bottle svg:gt('+(8-val).toString()+')').css('fill', 'rgba(58,173,226,0.9)');
    }
    else {
      $('.bottle svg').css('fill', 'rgba(58,173,226,0.9)');  
    };
    return true;
}

$('#mydatepicker .help-text-selector').click(function(){
    slctdday = new Date();
    var here = false;
    if ($(this).text()=='Завтра'){slctdday.setDate(slctdday.getDate()+1); here=true;}
    if ($(this).text()=='Післязавтра'){slctdday.setDate(slctdday.getDate()+2); here=true;}
    if (($(this).text()=='Найближча субота')||($(this).text()=='Cубота')){
        for (i = 0; i < 7; i++) {
            slctdday.setDate(slctdday.getDate()+1); 
            if (slctdday.getDay()==6) { break; }    }    
        here=true;}
    if (here==true) {
        if (slctdday.getDay()==7){slctdday.setDate(slctdday.getDate()+1);}
        $('#mydatepicker .input-group.date').datepicker('setDate', slctdday);}
    else {
        $(this).parent().find('input').attr('value',  $(this).text());}
    
    return true;
});

$('#form-kilkist .input-group-addon').click(function(){
   var inputField = $(this).parent().find('input');
   var n = parseInt(inputField.val(),10);
   if (($(this).text()==='-') && (n>=2)){
       n = n-1;
       inputField.val(n); zminaZamovVartist(n);
   };
    if (($(this).text()==='+') && (n<=8)){
        n = (n+1);
        inputField.val(n); zminaZamovVartist(n);
    };
    return true;
});
function zminaZamovVartist(val) {
    var vartist_num = val*35;
    document.getElementById('zamov-vartist').innerHTML = vartist_num.toString();
}

function chasDostavky(currentDiv){
    $('#slide-5 label').attr('style', '');
        
    $(currentDiv).css({
        'font-weight':'700',
        'color': '#333',
        'background-color':'#cef'
    });
    
    $(currentDiv).parent().find('input').attr('checked', true);

    return true;    };

function contaktSend()
{
    var myform =  document.getElementById('contactform');
    if (myform["inputName2"].value=="" ||
       myform["inputContact2"].value=="" ){
        
        $('#text-zapovnit-polia2').css({
            'display': 'block'
        });
        return false;
    }
    else{
        myform.submit();
        $('#zviazok-slide .container').css('height','80%');
        $('#zviazok-slide .row').css('display','none');
        $('#zviazok-slide form').css('display','none');
        $('#contact-form-success').css('display','block');
        return true;    
    }
};

function zamovlenniaSend()
{
    var myform =  document.getElementById('mainform');
    if (myform["inputName"].value=="" ||
       myform["inputPhone"].value=="" ){
        
        $('#text-zapovnit-polia').css({
            'display': 'block'
        });
        return false;
    }
    else{
        myform.submit();
        return true;    
    }
    
};
//
//function fooSubmited()
//{
//   alert("SuBMITED!");
//   return true;
//};