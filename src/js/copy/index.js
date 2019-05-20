function indexBox() {
	if(!isMobile){
        $('.banner').css({ height: w_height - $mtoph });
        $('.banner .item').css({ height: w_height - $mtoph });
        setImgMax($('.banner .pic2'), 1920, 980, w_width, w_height - $mtoph);
    }else{
        $('.banner').css({ height: 'auto' });
        $('.banner .item').css({ height: 'auto' });
        $('.banner .pic2').attr({ 'style': '' });
    }
}

indexBox();

$(window).resize(function() {
    indexBox();
});

$(function(){
	$('.banner').on('init', function(event, slick, currentSlide, nextSlide) {
        $('.banner .item').first().addClass('active');
    });

    // $('.banner .line i').css({width:0}).stop().animate({width:100+'%'},4800,'linear');

    $('.banner').slick({
        speed: 1000,
        arrows: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        pauseOnHover: false
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.banner .item').removeClass('active');
        $('.banner .item').eq(nextSlide).addClass('active');
        // $('.banner .line i').css({width:0}).stop().animate({width:100+'%'},5800,'linear');
    });


    function removeSlick() {
        var isSlick = $('.his-list').hasClass('slick-slider');
        if (w_width > 601 && isSlick === false) {
            // $('.his-list').slick({
            //     slidesToShow: 4,
            //     slidesToScroll: 4,
            //     responsive: [{
            //         breakpoint: 1025,
            //         settings: {
            //             slidesToShow: 3,
            //             slidesToScroll: 3
            //         }
            //     }
            //     ]
            // });
        } else if (w_width <= 601 && isSlick == true) {
            // $('.his-list').slick('unslick');
        }
    };

    removeSlick();

    $(window).resize(function() {
        removeSlick();
    });

	// $('.ip-list li').each(function(i, e) {
 //        $(this).css({
 //            'transition-delay': 200*i + 'ms',
 //            '-webkit-transition-delay': 200*i + 'ms'
 //        })
 //    });
 //    
 	$('.pnav a').bind(_click, function(e) {
        var hash = $(this).attr('href').split('#')[1];
        if(hash){
            e.preventDefault();
            $('html,body').animate({scrollTop: $('#' + hash).offset().top - $mtoph}, 800);
        }
    });

    $('.mtnav a').bind(_click, function(e) {
        var hash = $(this).attr('href').split('#')[1];
        if(hash){
            e.preventDefault();
            var w = $menuBox.width();
            $('html').removeClass('open');
            $menuBtn.removeClass('active');
            $('.menuBlack').stop().fadeOut(600);
            $menuBox.stop(false,false).animate({right:-w+"px"},function(){
                $(this).hide();
            });
            navItem = 0;
            $('html,body').animate({scrollTop: $('#' + hash).offset().top - $mtoph}, 800);
        }
    });
})