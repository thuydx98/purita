$( document ).ready(function() {
    $(window).load(function(){
        $('.loading').fadeOut(400);
    });
    $('.btn-scroll-down').click(function(){
        $('html, body').animate({
            scrollTop: $(".bread-wrapper").offset().top
        }, 600);
    });

  
	$('html').click(function(){
    	$('.search-form .form-control').removeClass('search-open').val('');
    });


    function closeMenu(){
        $('.overplay-mobile').removeClass('active');
        $('.btn-nav button').removeClass('is-active');
    }
    $('.btn_nav').click(function(){
        $('.nav-mobile').toggleClass('open-menu');
        if($('.overplay-mobile').is('visible')){
            closeMenu();
        }else{
            setTimeout(function(){
                $('.overplay-mobile').fadeIn(200);
            },150);
            setTimeout(function(){
                $('.banner-projects-w').toggleClass('page-wrapper-open');
                $('.banner-projects-w .banner-project').css({'background-attachment':'inherit'});
                $('.banner-projects-w .banner').css({'background-attachment':'inherit'});
                $('#page-wrapper').toggleClass('page-wrapper-open');
            },110);
            new WOW().init();
        }
    });

    $('.btn-nav-white').click(function(){
        closeMenu();
        $('.nav-mobile').removeClass('open-menu');
    });

    $('.overplay-mobile').click(function(e){
        $('.nav-mobile').removeClass('show');
        closeMenu();
    });

   

    scaleGallery = function(gallery){
        var wrap = gallery.width();
        var maxWidth  = parseInt($('body').width());
        scale = maxWidth/wrap;
        if(maxWidth <= wrap){
            gallery.css('-webkit-transform', 'scale('+scale+')');
        }else{
            gallery.css('-webkit-transform', 'scale(1)');
        }
    }
    var gallery = $('.gallery');
    scaleGallery(gallery);


    $(".backtotop").click(function () {
        $("html, body").animate({scrollTop: 0}, 400);
    });


    $('.btn-nav button').click(function(){
        if(!$(this).hasClass('clicked')){
            $(this).toggleClass("is-active");
            $(this).addClass('clicked');
            $('nav').toggleClass('active');
            $('.nav-mobile').toggleClass('show');
            $('.overplay-mobile').toggleClass('active');
        }else{
            return;
        }
        setTimeout(function(){
            $('.btn-nav button').removeClass('clicked');
        },400);
        $('.modal_close').click();
    });

    viewAddress = function(){
        var btn_view = $('.map-w .list-box .item .view-address');

        $('body').on('click','.item-map .view-address',function(e){
            e.stopPropagation();
            if(!$(this).hasClass('clicked')){
                $(this).addClass('clicked');
                $(this).parent().toggleClass('hidden');
                $(this).closest( ".item" ).find('.address-mobile').toggleClass('show');
                $(this).closest( ".item" ).find('.btn-close').toggleClass('show');
            }else{
                return;
            }
            setTimeout(function(){
                btn_view.removeClass('clicked');
            },100);
        })
    }   
    viewAddress();

    closeAddress = function(){
        var btn_close = $('.map-w .list-box .item .btn-close');
        $('body').on('click','.map-w .list-box .item .btn-close',function(e){
            e.stopPropagation();
            if($(this).hasClass('show')){
                $(this).closest('.item').find('.view-address').removeClass('clicked');
                $(this).removeClass('show');
                $(this).closest(".item").find('.btn-w').toggleClass('hidden');
                $(this).closest(".item").find('.address-mobile').toggleClass('show');
            }else{
                return;
            }
        })
    }
    closeAddress();

    showTabMobileMap = function(){
        var tab = $('.map-w .tab-mobile .tab');
        tab.click(function(){
            var id = $(this).attr('data-id');
            tab.removeClass('active');
            $(this).toggleClass('active');
            $('.map-w .box').removeClass('active');
            $('.map-w .box-'+id).addClass('active');
        });
    }
    showTabMobileMap();

    var time_resize = 500;
    var height_window_default = 0;
    setHeightMapListItemMapMobile = function(){
        setTimeout(function(){
            var width = $(window).width();
            var height_window = $(window).height();
            var height_search = $('.map-w .input-search').height();
            var h_topnav = $('.top-nav').height();
            var height_map = $('.map-w .map').height();
            var tab = $('.tab-mobile').height();
            // var height_listitem = height_window - (height_search+h_topnav+height_map+tab);

            if(!height_window_default){
                height_window_default = height_window;
            }
            var height_listitem = 0; 
            var iOS = !!navigator.userAgent && /iPad|iPhone|iPod/i.test(navigator.userAgent);

            if(iOS){
                height_listitem = height_window - (height_search+h_topnav+height_map);
            }else{
                height_listitem = height_window_default - (height_search+h_topnav+height_map);
            }
            $('.map-w .list-box .ct-box').css({'height':(height_listitem)});

        },time_resize);
    }
    setHeightMapListItemMapMobile();

    setHeightMap = function(){
        setTimeout(function(){
            // console.log('resize' + $(window).height() +"_"+ $(document).height());
            // console.log('resize' + window.innerHeight);
            var width = $(window).width();
            var height_window = window.innerHeight;
            var h_topnav = $('.top-nav').height();
            var height_map = height_window - h_topnav;
            $('.map-w').css({'height':height_map});
         },time_resize);
    }
    setHeightMap();
    setHeightMapListItemMap = function(){
        setTimeout(function(){
            var width = $(window).width();
            var height_search = $('.map-w .input-search').height();
            var height_window = $(window).height();
            var h_topnav = $('.top-nav').height();
            var height_list = height_window - (h_topnav+height_search);
            if(width >= 768){
                $('.map-w .list-box').css({'height':height_list});
                $('.map-w .list-box .ct-box').css({'height':"auto"});
            }
        },time_resize);
    }
    setHeightMapListItemMap();

    showMap = function(){
        var btn_call = $('.header-main .top-nav .call-right');
        btn_call.click(function(){
            $(this).toggleClass('active');
            // $('.header-main').toggleClass('fixed');
            // $('.top-nav').toggleClass('fixed');
            $('.map-w').toggleClass('show');
            disscroll();
        }); 
    };
    showMap();


    setHeightSliderHome = function(){
        var height_slide = $('.slider-home .slick-track').height();
        $('.section1_home').css('height',height_slide);
    }
    setHeightSliderHome();

    var active_step = 1;
    pagingSlideNumHome = function(){
        var step = $('.paging-step .li');
        step.click(function(){
            var index = $(this).index();
            var height_li = $(this).height();
            var line = $('.paging-step .line-active');
            var id_dot = index;
            var pos = index*height_li;
            if($(this).parent().hasClass('paging-onepage')){
               goToByScroll($(this).attr('data-id'));
            }else{
                if(active_step == 0 && index == 0){
                     $('.slider-step .slick-next').trigger('click');
                     active_step = 1;
                }else{
                    if(index == 6){
                        active_step = 0;
                    }
                    $('.slider-step .slick-dots li:eq('+id_dot+')').trigger('click');
                }
            }
            line.css({'top':pos});
            step.removeClass('active');
            $(this).addClass('active');
        });
    }
    pagingSlideNumHome();
     // opne page scroll
    goToByScroll = function(id){
        var t = 600;
        if(id == "6"){
            $('.paging-onepage').addClass('blue');
        }else{
             $('.paging-onepage').removeClass('blue');
        }
        $.fn.fullpage.moveTo(id);
    }
    triggerScrollDown = function(){
        var step_current = $('.paging-step .li.active');
        step_current.next().trigger('click');
    }
    triggerScrollUp = function(){
        var step_current = $('.paging-step .li.active');
        step_current.prev().trigger('click');
    }
  

    var delayScroll = false;
    // story1
    setHeightStory = function(){
        var width = $(window).width();
        var h_sec1 = $('.section1_story1').outerHeight();
        var h_sec2 = $('.section2_story1').outerHeight();
        if(width >= 1580){
            var h = h_sec1+h_sec2-417;
        }else if(width >= 992){
            var h = h_sec1+h_sec2-350;
        }else if(width >= 768){
            var h = h_sec1+h_sec2-223;
        }else if(width >= 420){
            var h = h_sec1+h_sec2-162;
        }else{
            var h = h_sec1+h_sec2-89;
        }
        $('.story1').css({"height":(h)});
    };
    setHeightStory();


    setHeightStory2 = function(){
        $(".story2 .fullpage").css({"height":($(window).height())});
    }
    setHeightStory2();

    expandTextStory = function(){
        var button = $('.section1_story1 .btn-circle');
        var button_close = $('.section2_story1 .circle-close');
        var text = $('.section2_story1 .middle');
        var h_story = $('.story1').outerHeight();
        button.click(function(){
            if(!$(this).hasClass('clicked')){
                var h_text = $('.section2_story1 .text-w').outerHeight();
                $(this).toggleClass('clicked');
                text.toggleClass('expand');
                // setHeightStory();
                $("html, body").animate({
                    scrollTop: $('.middle').offset().top 
                }, 800);
                button_close.removeClass('clicked');
            }else{
                return;
            }
            setTimeout(function(){
                setHeightStory();
            },900);
        });
        button_close.click(function(){
            if(!$(this).hasClass('clicked')){
                $(this).toggleClass('clicked');
                text.toggleClass('expand');
                var h_text = $('.section2_story1 .text-w').outerHeight();
                button.removeClass('clicked');
                setHeightStory();
            }else{
                return;
            }
            setTimeout(function(){
                setHeightStory();
            },900);
        });
    }
    expandTextStory();


    $('body').keydown(function(event){
        if (event.key === "Escape" || event.key == 27 || event.key === "Esc"){
            $('.popup-w .btn-close button').click();
        }
    });

    pageScroll = function(){
        var height = $(window).scrollTop();
        var width = $(window).width();
        if(width >= 768){
            if(height  > 90) {
                $('#page-wrapper').addClass('page-scroll');
            }else{
                $('#page-wrapper').removeClass('page-scroll');
            }
        }else{
            $('#page-wrapper').removeClass('page-scroll');
        }
    }
    pageScroll();
    $(window).scroll(function() {
       pageScroll();
    });


    $(window).resize(function(){
        // closeMenu();
        $('.nav-mobile').removeClass('open-menu');
        scaleGallery(gallery);
        setTimeout(function(){
            var width = $(window).width();
            if(width >= 768){
                setHeightMap();
                setHeightMapListItemMap();
                if($('#page-wrapper').hasClass('page-scroll-mobile')){
                    $('#page-wrapper').removeClass('page-scroll-mobile');
                }
            }else{
                setHeightMapListItemMapMobile();
            }
            pageScroll();
        },time_resize);
        setTimeout(function(){
            setHeightSliderHome();
            setHeightStory();
            setHeightStory2();
        },200);
    });

});

