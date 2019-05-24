$(document).ready(function(){
	//鼠标滚轮事件
	function wheel(event){
		var delta = 0;
		if (!event) event = window.event;
		if (event.wheelDelta) {
			delta = event.wheelDelta/120; 
			if (window.opera) delta = -delta;
		} else if (event.detail) {
			delta = -event.detail/3;
		}
		if (delta && !isMobile){
			mouseWheel(delta);
		}
	}
	 
	if (window.addEventListener)
	window.addEventListener('DOMMouseScroll', wheel, false);
	window.onmousewheel = document.onmousewheel = wheel;
	
	//键盘按键事件
	$(document).keydown(
		function(e){keyDown(e);
	});
	
	//鼠标滚轮事件
	function mouseWheel(delta) {
		var dir = delta > 0 ? "up" : "down";
		var $actived = $(".row.active");
		var activeIndex = parseInt($actived.attr('index'));
		var numOfChildren = $(".row").length;
		if( dir == "down" && activeIndex<numOfChildren && canRoll) {
			jumpPage(false);
		} else if( dir =="up" && activeIndex>1 && canRoll) {
			jumpPage(true);
		} 
	}
	
	//键盘事件
	function keyDown(e) {
		var keycode = e.which || e.keyCode;
		var $actived = $(".row.active");
		var activeIndex = parseInt($actived.attr('index'));
		var numOfChildren = $(".row").length;
		if ((keycode == 65 || keycode == 38 || keycode ==87 || keycode ==33 ) && activeIndex>1 && canRoll){
			jumpPage(true);
			return false;
		} else if ((keycode == 40 || keycode == 83 || keycode ==68 || keycode ==34 && canRoll) && activeIndex<numOfChildren && canRoll){
			jumpPage(false);
			return false;
		} 
	}
	
	function downBtnDown(){
		var $actived = $(".row.active");
		var activeIndex = parseInt($actived.attr('index'));
		var numOfChildren = $(".row").length;
		if (activeIndex<numOfChildren && canRoll){
			jumpPage(false);
		}else{
			jumpPage(true);
		}
	}
	//显示上一个||下一个section
	function jumpPage(up) {
		var $actived = $(".row.active");
		var activeIndex = parseInt($actived.attr('index'));
		showPage(activeIndex + (up?-1:1));
	}	
	
	$('.mouse-scroll').click(function() {
		downBtnDown();
	});
});
// showPage(2);
	var curIndex = 1,
		canRoll = true,
		ci = 1;
	function showPage(index){	
		if ( curIndex == index ) return; 
		if ( canRoll == false ) return;
		canRoll = false;
		if (index==1||index==5) {
			$('.row-controls').addClass('hide');
		} else {
			$('.row-controls').removeClass('hide');
			$('.row-controls li').removeClass('act').eq(index-2).addClass('act');
		}
		if(index==5){
			$("#s4").addClass('active2');
		}else{
			$("#s4").removeClass('active2');
		}	
		$("#s"+curIndex).removeClass("active").addClass("disappear");
		$("#boxsider").attr('class','');
		$("#boxsider").addClass("boxsider"+index);
		$("#s"+index).removeClass("disappear").addClass("active");
		var t = -(index-1)*w_height;
		if(index==5){
			var hnum=$("#s5").innerHeight();
			t=(-3*w_height)-hnum;
		}
		ci = index;
		$(".content").stop().animate({top:t},800,"easeInOutCirc");
		setTimeout(function(){
			canRoll = true;
		},1000);
		curIndex = index;
	}
	$('.row-controls li').click(function() {
		$('.row-controls li').removeClass('act');
		$(this).addClass('act');
		var index = $(this).index();
		showPage(index+2);
	});
	$(window).resize(function(){
		init();
	});
	function init(){
		if(!isMobile){
			$('.banner .item').css({height:w_height - $mtoph});
			setImgMax($('.banner .pic2'),1920,1000,w_width,w_height - $mtoph);
			$('.content').css({top:-(ci-1)*w_height});
			$('.rowh').css({height:w_height});
		}else{
			$('.rowh').css({height:"auto"});
			$('.content').attr('style', '');
			$('.banner .item').css({height:"auto"});
			$('.banner .pic2').attr('style', '');
		}
	}
	init();

	// $('.banner').on('init', function(event, slick, currentSlide, nextSlide) {
	// 	$('.banner .item').first().addClass('ba-active');
	// });
	$('.banner').slick({
		speed: 1000,
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 5000,
		// fade: true,
		pauseOnHover: false
	});

	$('.in-list').slick({
		speed: 1000,
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnHover: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [{
			breakpoint: 1202,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			}
		},
		{
			breakpoint: 642,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		},
		{
			breakpoint: 482,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
		]
	});

	function changeBranch(i) {
		$('.isc-nav p').removeClass('act');
		$('.isc-nav li').eq(i).find('p').addClass('act');
		$('.isc-list li').hide().removeClass('show').eq(i).show();
		setTimeout(function() {
			$('.isc-list li').eq(i).addClass('show');
		}, 100);
	}

	changeBranch(0);

	$('.isc-nav p').bind(_click, function() {
		var index = $(this).parent().index();
		changeBranch(index);
	});

	$('.row-controls li').each(function(i, e) {
		$(this).css({'transition-delay': 200*i + 'ms'})
	});

	$('.iedu-data li').each(function(i, e) {
		$(this).css({'transition-delay': 400 + 100*i + 'ms'})
	});

	$('.isc-nav li').each(function(i, e) {
		$(this).css({'transition-delay': 600 + 100*i + 'ms'})
	});

	$('.back-top1').bind(_click, function() {
		if (!isMobile) {
			showPage(4);
		} else {
			$('html,body').stop().animate({scrollTop: 0}, 800);
		}
	});

	$('.back-top2').bind(_click, function() {
		if (curIndex !== 1) {
			showPage(curIndex-1);
		}
	});
