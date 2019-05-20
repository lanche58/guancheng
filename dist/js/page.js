var isMobile = false,
	w_width =  0,
	w_height = 0,
	$mtoph = 0;

var $menuBtn = $('.menu-handler'),
    $menuBox = $('.menuBox'),
    navItem = 0;
    	
//移动端事件和PC事件的切换	
var _mousemove;
var _click;
var _mousedown;
var _mouseup;

if (Modernizr.touch) {
    _mousemove = "touchmove";
    _click = "touchend";
    _mousedown = "touchstart";
    _mouseup = "touchend";
    _mouseenter = "touchend";
} else {
    _mousemove = "mousemove";
    _click = "click";
    _mousedown = "mousedown";
    _mouseup = "mouseup";
    _mouseenter = "mouseenter";
}; 

function pageBox() {
	
   	w_width = $(window).width();
    w_height = $(window).height();	
	$mtoph = $('.mtop').height();
	
    if (w_width <= 1024) {
        isMobile = true;
    } else if (w_width > 1024) {
        isMobile = false;
    };

    if(w_width <= 861){
        var danNum=0;
        $('.pnav ul').css('display','none');
        $('.pnav').bind(_click,function(){
            if(danNum==1){
                $(this).removeClass('show');
                $(this).find('ul').stop().fadeOut();
                danNum = 0;
            }else{
                $(this).addClass('show');
                $(this).find('ul').stop().fadeIn();
                danNum = 1;
            }
        });
    }else{
        $('.pnav').removeClass('show');
        $('.pnav ul').css('display','block');
        $('.pnav').unbind(_click);
    }
};

pageBox();

$(window).resize(function () {
    pageBox();
});

$(function () {
	
	


    // 友情链接
    // var isopen = 0;
    // $('.friendship-link').bind(_click, function(){
    //     if(isopen==0){
    //         isopen = 1;
    //         $(this).addClass('act');
    //         $('.friendship-link .k').stop().slideDown(300);
    //     }else{
    //         isopen = 0;
    //         $(this).removeClass('act');
    //         $('.friendship-link .k').stop().slideUp(300);
    //     }
    // });
    // $('.friendship-link').mouseleave(function(){
    //     isopen = 0;
    //     $('.friendship-link').removeClass('act');
    //     $('.friendship-link .k').stop().slideUp(300);
    // });




	// 手机导航
	// $('.navMobile dd > a').bind(_click, function (e) {
	// 	if($(this).next('.mtv').size() >= 1){
	// 		if(!$(this).hasClass('act')){
	// 			e.preventDefault();
	// 			$('.navMobile dd > a').removeClass('act');
	// 			$('.mtv').stop().slideUp(300);
	// 			$(this).addClass('act');
	// 			$(this).next('.mtv').stop().slideDown(300);
	// 		}else{
	// 			$(this).removeClass('act');
	// 			$(this).next('.mtv').stop().slideUp(300);
	// 		}
	// 	}
	// });
	// $menuBtn.bind(_click, function () {
 //        var w = $menuBox.width();
 //        if (navItem == 0) {
 //            $('html').addClass('open');
 //            $('.menuBlack').stop().fadeIn(600);
 //            $(this).addClass('active');
 //            $menuBox.show().stop(false,false).animate({right:0});
 //            navItem = 1;
 //        } else {
 //            $('html').removeClass('open');
 //            $('.menuBlack').stop().fadeOut(600);
 //            $(this).removeClass('active').stop(false,false).animate({right:0});
 //            $menuBox.stop(false,false).animate({right:-w+"px"},function(){
 //                $(this).hide();
 //            });
 //            navItem = 0;
 //        };
 //    });
 //    $('.menuBlack').bind(_click, function () {
 //        var w = $menuBox.width();
 //        $('html').removeClass('open');
 //        $menuBtn.removeClass('active');
 //        $('.menuBlack').stop().fadeOut(600);
 //        $menuBox.stop(false,false).animate({right:-w+"px"},function(){
 //            $(this).hide();
 //        });
 //        navItem = 0;
 //    });
	
	
	// pbanner animation
	$(window).scroll(function() {
        var windowTop = $(window).scrollTop();
        if (windowTop < w_height && !isMobile) {
            $('.pbanner .pic2 img').css('transform', "translate(0px," + (windowTop) / 1.5 + "px)");
            $('.pro-banner .pic2 img').css('transform', "translate(0px," + (windowTop) / 1.5 + "px)");
        }
    });
 
	// Imitation placeholder function
	$('.s-input').bind({
        focus:function(){
        if (this.value == this.defaultValue){
            this.value="";
        }
        },blur:function(){
        if (this.value == ""){
            this.value = this.defaultValue;
        }
        }
    });

    // Back to top
    $('#top').bind(_click, function(){
    	$('html,body').stop().animate({scrollTop: 0}, 800);
    });

    // Scroll a screen
    $('#mouse').bind(_click, function(){
        $('html,body').stop().animate({scrollTop: w_height}, 800);
    });

    // video play
    $('.vwrap .close, .vwrap .videobtg').bind(_click, function(){
        objplay.stop(); 
        $('.vwrap').hide();
        $('#videobox').html('');
    });
    $('.vi-btn').bind(_click, function(e){
        e.stopPropagation();
        e.preventDefault();
        var img = $(this).attr('data-video-image');
        var video = $(this).attr('data-video-url');
        Video.load({
            vcontainer: 'videobox',
            vfimg: img,
            vfiles: video,
            isautoplay: 'true'
        });
        $('.vwrap').fadeIn();
    });

	// weixin
	setPopUp($('.weixin'), "官方微信");
	function setPopUp(obj, title){
        obj.bind(_click, function(e){
            e.preventDefault();
            var str = '<div class="popUpblack"><div class="popUp"><div class="t">' + title + '<span class="close">关闭</span></div><div class="img"><img src="' + $(this).attr("href") + '"/></div></div></div>';
            $('body').append(str);
            $('.popUpblack').fadeIn().addClass('show');
            $('.popUp .close, .popUpblack').bind(_click, function(){
                $(".popUpblack").remove();
            })
        })
    };

    // hash
	function setScroll(anchorCur){
		if(jQuery(anchorCur).length>=1){
			jQuery("html,body").animate({ scrollTop: jQuery(anchorCur).offset().top-$mtoph}, 0);
		}
	};
	window.onload = function () {
		var hash = location.href.split("#")[1];
		if (hash) {
			setScroll("#" + hash);
		}
	};
});

// 视频播放
var objplay;
var Video = {
	load: function (objs) {
		objplay = jwplayer(objs.vcontainer).setup({
			flashplayer: 'js/video/flashplay.swf',
			html5player: 'js/video/html5player.js',
			file: objs.vfiles,
			image: objs.vfimg,
			width: '100%',
			height: '100%',
			aspectratio: '16:9',
			stretching: 'fill',
			controls: 'true',
			autostart: objs.isautoplay
		});
		return objplay;
	}
};

// 图片全屏
function setImgMax(img, imgW, imgH, tW, tH) {
    var tWidth = tW || w_width;
    var tHeight = tH || w_height;
    var coe = imgH / imgW;
    var coe2 = tHeight / tWidth;
    if (coe < coe2) {
        var imgWidth = tHeight / coe;
        img.css({ height: tHeight, width: imgWidth, left: -(imgWidth - tWidth) / 2, top: 0 });
    } else {
        var imgHeight = tWidth * coe;
        img.css({ height: imgHeight, width: tWidth, left: 0, top: -(imgHeight - tHeight) / 2 });
    };
};

// 弹出层
function setLayer(addr){
    $.ajax({
        url: addr,
        dataType: 'html',
        success: function(data){
            if (data == "" || data == null) {
                return;
            } else {
                $('body').append(data);
                $('html').addClass('open'); 
                setTimeout(function(){
                    $('.ly-box').addClass('show');
                }, 100);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){ $('.ly-box').remove(); }
    });
    $(document).on(_click, '.ly-close', function(e){
        e.preventDefault();
        $('.ly-box').remove();
        $('html').removeClass('open');
    });
    $(document).on(_click, '.ly-box', function(e){
        if ($(e.target).hasClass('ly-box')) {
            $('.ly-box').remove();
            $('html').removeClass('open');
        }
    })
};
$(document).on(_click, '.ly-btn', function(e){
    e.preventDefault();
    setLayer($(this).attr('href'));
});

// 截图文字段为一个一个
function splitWords(el) {
    var _test = el.html().split('<br>');
    el.html('');
    for (var i = 0; i < _test.length; i++) {
        el.append('<span></span>');
        _test[i] = _test[i].split('');
        var _span = el.find('span');
        for (var j = 0; j < _test[i].length; j++) {
            _span.eq(i).append('<i></i>');
            var _i = _span.eq(i).find('i');
            _i.eq(j).text(_test[i][j]).css({
                'animation-delay': 100*j + 'ms',
                '-webkit-animation-delay': 100*j + 'ms'
            });
        }
    }
};