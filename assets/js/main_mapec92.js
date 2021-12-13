var map;
var markerCluster;
var markers = [];

var searchTimeOut = null;
var searach_list = null;
var search = {
        "1": "(Q. 1)",
        "q1": "(Q. 1)",
        "q 1": "(Q. 1)",
        "q.1": "(Q. 1)",
        "q. 1": "(Q. 1)",
        "quan1": "(Q. 1)",
        "quan 1": "(Q. 1)",
        "quận1": "(Q. 1)",
        "quận 1": "(Q. 1)",
        "2": "(Q. 2)",
        "q2": "(Q. 2)",
        "q 2": "(Q. 2)",
        "q.2": "(Q. 2)",
        "q. 2": "(Q. 2)",
        "quan2": "(Q. 2)",
        "quan 2": "(Q. 2)",
        "quận2": "(Q. 2)",
        "quận 2": "(Q. 2)",
        "3": "(Q. 3)",
        "q3": "(Q. 3)",
        "q 3": "(Q. 3)",
        "q.3": "(Q. 3)",
        "q. 3": "(Q. 3)",
        "quan3": "(Q. 3)",
        "quan 3": "(Q. 3)",
        "quận3": "(Q. 3)",
        "quận 3": "(Q. 3)",
        "4": "(Q. 4)",
        "q4": "(Q. 4)",
        "q 4": "(Q. 4)",
        "q.4": "(Q. 4)",
        "q. 4": "(Q. 4)",
        "quan4": "(Q. 4)",
        "quan 4": "(Q. 4)",
        "quận4": "(Q. 4)",
        "quận 4": "(Q. 4)",
        "5": "(Q. 5)",
        "q5": "(Q. 5)",
        "q 5": "(Q. 5)",
        "q.5": "(Q. 5)",
        "q. 5": "(Q. 5)",
        "quan5": "(Q. 5)",
        "quan 5": "(Q. 5)",
        "quận5": "(Q. 5)",
        "quận 5": "(Q. 5)",
        "6": "(Q. 6)",
        "q6": "(Q. 6)",
        "q 6": "(Q. 6)",
        "q.6": "(Q. 6)",
        "q. 6": "(Q. 6)",
        "quan6": "(Q. 6)",
        "quan 6": "(Q. 6)",
        "quận6": "(Q. 6)",
        "quận 6": "(Q. 6)",
        "7": "(Q. 7)",
        "q7": "(Q. 7)",
        "q 7": "(Q. 7)",
        "q.7": "(Q. 7)",
        "q. 7": "(Q. 7)",
        "quan7": "(Q. 7)",
        "quan 7": "(Q. 7)",
        "quận7": "(Q. 7)",
        "quận 7": "(Q. 7)",
        "8": "(Q. 8)",
        "q8": "(Q. 8)",
        "q 8": "(Q. 8)",
        "q.8": "(Q. 8)",
        "q. 8": "(Q. 8)",
        "quan8": "(Q. 8)",
        "quan 8": "(Q. 8)",
        "quận8": "(Q. 8)",
        "quận 8": "(Q. 8)",
        "9": "(Q. 9)",
        "q9": "(Q. 9)",
        "q 9": "(Q. 9)",
        "q.9": "(Q. 9)",
        "q. 9": "(Q. 9)",
        "quan9": "(Q. 9)",
        "quan 9": "(Q. 9)",
        "quận9": "(Q. 9)",
        "quận 9": "(Q. 9)",
        "10": "(Q. 10)",
        "q10": "(Q. 10)",
        "q 10": "(Q. 10)",
        "q.10": "(Q. 10)",
        "q. 10": "(Q. 10)",
        "quan10": "(Q. 10)",
        "quan 10": "(Q. 10)",
        "quận10": "(Q. 10)",
        "quận 10": "(Q. 10)",
        "11": "(Q. 11)",
        "q11": "(Q. 11)",
        "q 11": "(Q. 11)",
        "q.11": "(Q. 11)",
        "q. 11": "(Q. 11)",
        "quan11": "(Q. 11)",
        "quan 11": "(Q. 11)",
        "quận11": "(Q. 11)",
        "quận 11": "(Q. 11)",
        "12": "(Q. 12)",
        "q12": "(Q. 12)",
        "q 12": "(Q. 12)",
        "q.12": "(Q. 12)",
        "q. 12": "(Q. 12)",
        "quan12": "(Q. 12)",
        "quan 12": "(Q. 12)",
        "quận12": "(Q. 12)",
        "quận 12": "(Q. 12)",
        "td": "(Thủ Đức)",
        "qtd": "(Thủ Đức)",
        "q td": "(Thủ Đức)",
        "q.td": "(Thủ Đức)",
        "q. td": "(Thủ Đức)",
        "thu duc": "(Thủ Đức)",
        "quan thu duc": "(Thủ Đức)",
        "q thu duc": "(Thủ Đức)",
        "q. thu duc": "(Thủ Đức)",
        "q.thu duc": "(Thủ Đức)",
        "thủ đức": "(Thủ Đức)",
        "quận thủ đức": "(Thủ Đức)",
        "q. thủ đức": "(Thủ Đức)",
        "quan td": "(Thủ Đức)",
        "gv": "(Gò Vấp)",
        "qgv": "(Gò Vấp)",
        "q gv": "(Gò Vấp)",
        "q.gv": "(Gò Vấp)",
        "q. gv": "(Gò Vấp)",
        "go vap": "(Gò Vấp)",
        "quan go vap": "(Gò Vấp)",
        "q go vap": "(Gò Vấp)",
        "q. go vap": "(Gò Vấp)",
        "q.go vap": "(Gò Vấp)",
        "gò vấp": "(Gò Vấp)",
        "quận gò vấp": "(Gò Vấp)",
        "q. gò vấp": "(Gò Vấp)",
        "quan gv": "(Gò Vấp)",
        "bt": "(Bình Thạnh) (Bình Tân)",
        "bth": "(Bình Thạnh)",
        "qbt": "(Bình Thạnh) (Bình Tân)",
        "qbth": "(Bình Thạnh)",
        "q bt": "(Bình Thạnh) (Bình Tân)",
        "q bth": "(Bình Thạnh)",
        "q.bt": "(Bình Thạnh) (Bình Tân)",
        "q. bt": "(Bình Thạnh) (Bình Tân)",
        "binh thanh": "(Bình Thạnh)",
        "quan binh thanh": "(Bình Thạnh)",
        "q binh thanh": "(Bình Thạnh)",
        "q. binh thanh": "(Bình Thạnh)",
        "q.binh thanh": "(Bình Thạnh)",
        "bình thạnh": "(Bình Thạnh)",
        "quận bình thạnh": "(Bình Thạnh)",
        "q. bình thạnh": "(Bình Thạnh)",
        "quan bt": "(Bình Thạnh) (Bình Tân)",
        "quan bth": "(Bình Thạnh)",
        "binh tan": "(Bình Tân)",
        "quan binh tan": "(Bình Tân)",
        "q binh tan": "(Bình Tân)",
        "q. binh tan": "(Bình Tân)",
        "q.binh tan": "(Bình Tân)",
        "bình tân": "(Bình Tân)",
        "quận bình tân": "(Bình Tân)",
        "q. bình tân": "(Bình Tân)",
        "pn": "(Phú Nhuận)",
        "qpn": "(Phú Nhuận)",
        "q pn": "(Phú Nhuận)",
        "q.pn": "(Phú Nhuận)",
        "q. pn": "(Phú Nhuận)",
        "phu nhuan": "(Phú Nhuận)",
        "quan phu nhuan": "(Phú Nhuận)",
        "q phu nhuan": "(Phú Nhuận)",
        "q. phu nhuan": "(Phú Nhuận)",
        "q.phu nhuan": "(Phú Nhuận)",
        "phú nhuận": "(Phú Nhuận)",
        "quận phú nhuận": "(Phú Nhuận)",
        "q. phú nhuận": "(Phú Nhuận)",
        "quan pn": "(Phú Nhuận)",
        "tb": "(Tân Bình)",
        "qtb": "(Tân Bình)",
        "q tb": "(Tân Bình)",
        "q.tb": "(Tân Bình)",
        "q. tb": "(Tân Bình)",
        "tan binh": "(Tân Bình)",
        "quan tan binh": "(Tân Bình)",
        "q tan binh": "(Tân Bình)",
        "q. tan binh": "(Tân Bình)",
        "q.tan binh": "(Tân Bình)",
        "tân bình": "(Tân Bình)",
        "quận tân bình": "(Tân Bình)",
        "q. tân bình": "(Tân Bình)",
        "quan tb": "(Tân Bình)",
        "tp": "(Tân Phú)",
        "qtp": "(Tân Phú)",
        "q tp": "(Tân Phú)",
        "q.tp": "(Tân Phú)",
        "q. tp": "(Tân Phú)",
        "tan phu": "(Tân Phú)",
        "quan tan phu": "(Tân Phú)",
        "q tan phu": "(Tân Phú)",
        "q. tan phu": "(Tân Phú)",
        "q.tan phu": "(Tân Phú)",
        "tân phú": "(Tân Phú)",
        "quận tân phú": "(Tân Phú)",
        "q. tân phú": "(Tân Phú)",
        "quan tp": "(Tân Phú)",
        "cc": "(Củ Chi)",
        "hcc": "(Củ Chi)",
        "h cc": "(Củ Chi)",
        "h.cc": "(Củ Chi)",
        "h. cc": "(Củ Chi)",
        "cu chi": "(Củ Chi)",
        "huyen cu chi": "(Củ Chi)",
        "h cu chi": "(Củ Chi)",
        "h. cu chi": "(Củ Chi)",
        "h.cu chi": "(Củ Chi)",
        "củ chi": "(Củ Chi)",
        "huyện củ chi": "(Củ Chi)",
        "h. củ chi": "(Củ Chi)",
        "huyen cc": "(Củ Chi)",
        "nb": "(Nhà Bè)",
        "hnb": "(Nhà Bè)",
        "h nb": "(Nhà Bè)",
        "h.nb": "(Nhà Bè)",
        "h. nb": "(Nhà Bè)",
        "nha be": "(Nhà Bè)",
        "huyen nha be": "(Nhà Bè)",
        "h nha be": "(Nhà Bè)",
        "h. nha be": "(Nhà Bè)",
        "h.nha be": "(Nhà Bè)",
        "nhà bè": "(Nhà Bè)",
        "huyện nhà bè": "(Nhà Bè)",
        "h. nhà bè": "(Nhà Bè)",
        "huyen nb": "(Nhà Bè)",
        "bc": "(Bình Chánh)",
        "hbc": "(Bình Chánh)",
        "h bc": "(Bình Chánh)",
        "h.bc": "(Bình Chánh)",
        "h. bc": "(Bình Chánh)",
        "binh chanh": "(Bình Chánh)",
        "huyen binh chanh": "(Bình Chánh)",
        "h binh chanh": "(Bình Chánh)",
        "h. binh chanh": "(Bình Chánh)",
        "h.binh chanh": "(Bình Chánh)",
        "bình chánh": "(Bình Chánh)",
        "huyện bình chánh": "(Bình Chánh)",
        "h. bình chánh": "(Bình Chánh)",
        "huyen bc": "(Bình Chánh)",
        "cg": "(Cần Giờ)",
        "hcg": "(Cần Giờ)",
        "h cg": "(Cần Giờ)",
        "h.cg": "(Cần Giờ)",
        "h. cg": "(Cần Giờ)",
        "can gio": "(Cần Giờ)",
        "huyen can gio": "(Cần Giờ)",
        "h can gio": "(Cần Giờ)",
        "h. can gio": "(Cần Giờ)",
        "h.can gio": "(Cần Giờ)",
        "cần giờ": "(Cần Giờ)",
        "huyện cần giờ": "(Cần Giờ)",
        "h. cần giờ": "(Cần Giờ)",
        "huyen cg": "(Cần Giờ)",
        "hm": "(Hóc Môn)",
        "hhm": "(Hóc Môn)",
        "h hm": "(Hóc Môn)",
        "h.hm": "(Hóc Môn)",
        "h. hm": "(Hóc Môn)",
        "hoc mon": "(Hóc Môn)",
        "huyen hoc mon": "(Hóc Môn)",
        "h hoc mon": "(Hóc Môn)",
        "h. hoc mon": "(Hóc Môn)",
        "h.hoc mon": "(Hóc Môn)",
        "hóc môn": "(Hóc Môn)",
        "huyện hóc môn": "(Hóc Môn)",
        "h. hóc môn": "(Hóc Môn)",
        "h hóc môn": "(Hóc Môn)",
        "huyen hm": "(Hóc Môn)"
    };
    var toado = {
        "(Q. 1)":["10.7753675","106.6798483"],
        "(Q. 2)":["10.7816777","106.7232101"],
        "(Q. 3)":["10.7789897","106.6635601"],
        "(Q. 4)":["10.7605479","106.6950984"],
        "(Q. 5)":["10.7558704","106.6512456"],
        "(Q. 6)":["10.7460737","106.6204152"],
        "(Q. 7)":["10.7370305","106.6894973"],
        "(Q. 8)":["10.722363","106.6105006"],
        "(Q. 9)":["10.8318428","106.748999"],
        "(Q. 10)":["10.7728399","106.6516285"],
        "(Q. 11)":["10.7659368","106.6390387"],
        "(Q. 12)":["10.8611925","106.6251885"],
        "(Thủ Đức)":["10.855185","106.7185923"],
        "(Gò Vấp)":["10.8354497","106.6487243"],
        "(Bình Thạnh)":["10.8125896","106.6995233"],
        "(Bình Tân)":["10.7707225","106.521607"],
        "(Phú Nhuận)":["10.8010237","106.671416"],
        "(Tân Bình)":["10.8029342","106.6183177"],
        "(Tân Phú)":["10.7915527","106.5921818"],
        "(Củ Chi)":["11.0377466","106.3663201"],
        "(Nhà Bè)":["10.6514861","106.6572872"],
        "(Bình Chánh)":["10.7497425","106.4389981"],
        "(Cần Giờ)":["10.5233457","106.7428145"],
        "(Hóc Môn)":["10.8778202","106.5234738"]
    };



$( document ).ready(function() {
    showMap = function(){
        var btn_call = $('.header-main .top-nav .call-right');
        $(".box-1 .head-box").hide();
        btn_call.click(function(){
            // $(this).toggleClass('active');
            // $('.header-main').toggleClass('fixed');
            // $('.top-nav').toggleClass('fixed');]

            if($(window).width() < 768){
                $('.tab-mobile [data-id="2"]').click();
            }
            map = new MapClass();
            var zoomlevel = map.getMap().getZoom();
            if (!zoomlevel) zoomlevel = 16;
            getAllOutet({
                lng: map.location.longitude,
                lat: map.location.latitude,
                query: '',
                zoomlevel: zoomlevel
            },function(data){
                try{
                    if(data.Result){
                        $('.outlet-all').empty();
                        var check = false;
                        var call = $.cookie('call');

                        if(call) call = JSON.parse($.cookie('call'));

                        for(var i = 0; i < data.Result.length; i++){
                             // console.log(data.Result[i].Location,data.Result[i].OutletName);

                            var location = data.Result[i].Location.split(',');

                            if(!(call && call.OutletCode == data.Result[i].OutletCode)){
                                map.addMarker({
                                    location: {
                                        lng: parseFloat(location[1]),
                                        lat: parseFloat(location[0])
                                    },
                                    icon: './assets/icons/marker-icon.png',
                                    OutletCode: data.Result[i].OutletCode
                                },function(){
	                        		$(".search .result").hide();
	    							$('.list-box:not(.result)').show();
	                            });
                            }

                            
                            $('.outlet-all').append(vinhHaoTemplate(data.Result[i]));
                        }
                        if(check) $('.box-2 .head-box').show();
                        


                        if(call){
                            call = JSON.parse($.cookie('call'));

                            var location =call.Location.split(',');

                            map.addMarker({
                                location: {
                                    lng: parseFloat(location[1]),
                                    lat: parseFloat(location[0])
                                },
                                icon: './assets/icons/marker-icon.png',
                                OutletCode: call.OutletCode
                            },function(){
                        		$(".search .result").hide();
    							$('.list-box:not(.result)').show();
                            });



                            $(".outlet-all-call").append(vinhHaoTemplate(call));
                            $(".box-1 .head-box").show();
                        }
                        map.data  = data.Result;
                        markerCluster = MapCluster(map.getMap(), markers);
                        $('.outlet-all').scrollTop(1);
                    }
                    google.maps.event.addListener(map.getMap(), 'bounds_changed', (function () {
                        var timer;

                        return function() {
                            $('.outlet-all .item').hide();
                            $('.outlet-all .text-center').remove();
							$('.outlet-all').append('<div class="text-center"><br /><p><img src="./assets/icons/loading_icon.gif" /></p><p>Đang tải dữ liệu...</p></div>');
                            clearTimeout(timer);
                            timer = setTimeout(function() {
                                // console.log('bounds_changed');
                                var active_code = $('.item-map.active').attr('code');

                                console.log(active_code);

                                var zoomlevel = map.getMap().getZoom();
                                if (!zoomlevel) zoomlevel = 16;
                                getAllOutet({
                                    lng: map.getMap().getCenter().lat(),
                                    lat: map.getMap().getCenter().lng(),
                                    query: '',
                                    zoomlevel: zoomlevel
                                },function(data){
                                    try{
                                        $('.outlet-all').empty();
                                        var call = $.cookie('call');
                                        for(var i = 0; i < data.Result.length; i++){
                                            var location = data.Result[i].Location.split(',');
                                            var check = true;
                                            for(var j = 0; j < markers.length; j++){
                                                if(markers[j].OutletCode == data.Result[i].OutletCode){
                                                    check = false;
                                                    break;
                                                }
                                            }
                                            if(check){
                                                 var f = map.addMarker({
                                                    location: {
                                                        lng: parseFloat(location[1]),
                                                        lat: parseFloat(location[0])
                                                    },
                                                    icon: './assets/icons/marker-icon.png',
                                                    OutletCode: data.Result[i].OutletCode
                                                });
                                                markerCluster.addMarker(f);
                                            }

                                            var $template = vinhHaoTemplate(data.Result[i]);

                                            if(active_code && data.Result[i].OutletCode == active_code){
                                                $($template).addClass('active');
                                                $('.outlet-all').prepend($template);
                                            }else
                                                $('.outlet-all').append($template);
                                        }
                                        map.data  = data.Result;
                                        $('.outlet-all').scrollTop(1);
                                    }catch(e){
                                        console.log(e);
                                    }
                                })
                            }, 600);
                        }
                    }()));
                }catch(e){}
            });
        });
    };
    showMap();
    $('body').on('click','.phone .num, .item-map .tel',function(e){
        e.stopPropagation();
        var OutletCode = $(this).closest('[code]').attr('code');
        var call = $.cookie('call');
        if(call) call = JSON.parse(call);
        if(!call || call.OutletCode != OutletCode){
            for(var i = 0 ; i < map.data.length; i++){
                if(map.data[i].OutletCode == OutletCode){
                    call = map.data[i];
                    $.cookie('call',JSON.stringify(call));
                    $('.outlet-all-call').parent().find('.head-box').show();
                    $('.outlet-all-call').empty().append($(this).closest('[code]').clone());
                    ga('send', {
                      hitType: 'event',
                      eventCategory: 'Click-Phone-to-call',
                      eventAction: 'Call',
                      eventLabel: 'Outlet code: ' + map.data[i].OutletCode
                    });
                    return;
                }
            }
        }
    })

    $('body').click(function(e){
        e.stopPropagation();
       
        if($(window).width() < 768){
            if($(e.target).closest('.result').length){
	            $('.list-box.result').hide();
	            $('.list-box:not(.result)').show();
	        }
        }
        // else{
        // 	$(".search .result").hide();
        // 	$('.list-box:not(.result)').show();
        // }
        
    })

    $('.btn-search .fa').click(function(){
        console.log('btn serach click');
        if($(window).width() < 768){
            $('.list-box:not(.result)').show();
        }
    })

    $('.search input').focus(function(e){
        e.stopPropagation();
        e.preventDefault();

        $(".search .result .box").show();

        var val = $(this).val();

        if(val && searach_list){
            $(".search .result").addClass('show-result').show().find('.box').show();
        }else{
            $(".search .result").removeClass('show-result').hide();
        }



        if($(window).width() < 768){
            // var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
            var iOS = !!navigator.userAgent && /iPad|iPhone|iPod/i.test(navigator.userAgent);
            if(iOS){
                $('.map-w').addClass('serach-mobile-ios');
            }else{
                $('.map-w').addClass('serach-mobile');
            }

            $('.list-box:not(.result)').hide();


            
            // $('body,html').addClass('disscroll');
            
        }

        // else{
        //     $('.map-w').removeClass('serach-mobile serach-mobile-ios');
        // }


    })


    $('.search input').focusout(function(e){
        e.stopPropagation();
        e.preventDefault();
        $('.map-w').removeClass('serach-mobile serach-mobile-ios');

        if($(window).width() < 768){
            // $('.list-box:not(.result)').show();

            
            
            // $('.disscroll').removeClass('disscroll');
            // $('.list-box.result').scrollTo();
        }
    })

    var timeScroll = 0;
    $('.ct-box').scroll(function(e){
       
        if($(window).width() < 768){
            if($(this).scrollTop() == 0){
                $(this).scrollTop(1);
            }

            else if(($(this).scrollTop() + $(this).height()) >= this.scrollHeight){
                var  _this = $(this);
                clearTimeout(timeScroll);
                timeScroll = setTimeout(function(){
                    _this.scrollTop(_this.scrollTop() - 1);
                },100);
            }
        }
    })

    $('body').resize(function(){

        var $map = $('.map-w');
        if($(window).width() < 768){
            if($map.hasClass('show')){
                setHeightMap();
            }
        }
        

    });



    $('.search input').click(function(e){
        e.stopPropagation();
        e.preventDefault();
    })



    $('.search input').keyup(function(b){
        var a = $(this).val().trim().toLowerCase();
        var e = $(this).closest('.input-search').find('.btn-search .fa');
        if (a.length >= 2) {
            e.removeClass("fa-search").addClass("fa-spinner fa-spin");
            if (searchTimeOut) {
                clearTimeout(searchTimeOut);
                searchTimeOut = null;
            }

            $('.search .result .ct-box').html('<div class="text-center"><br /><p><img src="./assets/icons/loading_icon.gif" /></p><p>Đang tải dữ liệu...</p></div>');

            searchTimeOut = setTimeout(function() {
                var vitri = [map.location.longitude, map.location.latitude];
                if (search[a] !== undefined) {
                    a = search[a];
                    var center = new google.maps.LatLng(toado[a][0], toado[a][1]);
                    map.getMap().panTo(center);

                    vitri = [toado[a][0], toado[a][1]];
                }


                 getAllOutet({
                        lng: vitri[0],
                        lat:  vitri[1],
                        query: a,
                        zoomlevel: map.getMap().getZoom()
                    },function(data){
                            searach_list = data;

                            $('.search .result').show();
                            // if($(window).width() < 768){
                            //     $('.list-box:not(.result)').hide();
                            // }
                            

                            if(data && data.Result){
                                $('.search .result .ct-box').empty();
                                for(var i = 0; i < data.Result.length; i++){
                                    // console.log(data.Result[i].Location,data.Result[i].OutletName);
                                    $('.search .result .ct-box').append(vinhHaoTemplate(data.Result[i]));
                                }
                                 
                            }else{
                                 $('.search .result .ct-box').html('<div class="text-center"><br /><p>Không có đại lý nào ở khu vực này, bạn vui lòng tìm quận khác</p></div>');
                            }

                            e.removeClass("fa-spinner fa-spin").addClass("fa-times");
                            e.closest('.btn-search').bind("click", function() {
                                e.removeClass("fa-spinner fa-spin fa-times").addClass("fa-search");
                                searach_list = null;
                                $(".search input").val("");
                                $(".search .result").hide();
                            });

                            $('.list-box.result .ct-box').scrollTop(1);

                    });
            }, 1000);
        } else {
            e.removeClass('fa-spinner fa-spin fa-times').addClass("fa-search");
            e.closest('.btn-search').unbind("click")
        }
    })

    $('body').on('click','.item-map',function(e){
        var $this = $(this);

        // if($target.hasClass('view-address')){
        //     $target.trigger('click');
        //     return;
        // }else if($target.closest('.view-address').length > 0){
        //     $target.closest('.view-address').trigger('click');
        //     return;
        // }  



        moveToOutlet($this.attr('code'),$this);


    });


    $('.btn-contact').click(function(e){
        // console.log(1);
        var name = $('#contactus_name').val(),
            email = $('#contactus_email').val(),
            company = $('#contactus_company').val(),
            sub = $('#contactus_subject').val(),
            mess = $('#contactus_message').val();

        if(!name){
            alert('Họ và tên không được để trống');
            return;
        }

        if(!email){
            alert('Email không được để trống');
            return;
        }else if(!validateEmail(email)){
            alert('Xin vui lòng điền đúng định dạng của email là example@gmail.com');
            return;
        }

        if(!sub){
            alert('Tiêu đề không được để trống');
            return;
        }

        if(!mess){
            alert('Nội dung không được để trống');
            return;
        }

        var data = [
            {
                Code: "contactus_name",
                TextValue: name, 
                ValueType: "Text"
            },
            {
                Code: "contactus_email",
                TextValue: email, 
                ValueType: "Text"
            },
            {
                Code: "contactus_subject",
                TextValue: sub, 
                ValueType: "Text"
            },
            {
                Code: "contactus_message",
                TextValue: mess, 
                ValueType: "Text"
            },
        ];

        if(company){
            data.push({
                Code: "contactus_company",
                TextValue: company, 
                ValueType: "Text"
            })
        }


        Contact(data,function(e){
            // console.log(e);
        })
    })

});

function vinhHaoTemplate(data){
    var $html = $('<div class="item item-map row" id="outlet_list_'+data.OutletCode+'"  code="'+data.OutletCode+'"> <div class="icon col-xs-2" style="display:none;"><span>A</span></div> <div class="text-w col-xs-10"> <div class="name"> <span class="title"></span> <span class="km hidden-xs" style="display:none;">12 km</span> </div> <div class="clear"></div> <div class="location hidden-xs"> <i class="fa fa-map-marker col-xs-1" aria-hidden="true"></i> <div class="address col-xs-11"></div> </div> <div class="clear"></div> <div class="phone hidden-xs"> <i class="fa fa-phone col-xs-1" aria-hidden="true"></i> <a href="#" class="num col-xs-11 tel"></a> </div> <div class="address hidden-sm hidden-md hidden-lg">259 đường Trần Quốc Thảo, Phường 2, Quận 3, Tp. Hồ Chí Minh</div><div class="btn-w hidden-sm hidden-md hidden-lg"> <div class="btn-primary phone-call"><a class="tel" href=""><i class="fa fa-phone" aria-hidden="true"></i><span class="num"></span></a></div> </div> <div class="address-mobile col-xs-12 hidden-sm hidden-md hidden-lg"> </div> </div> <div class="btn-close hidden-sm hidden-md hidden-lg"><i class="fa fa-times" aria-hidden="true"></i></div> </div>');
    $html.v_bind({
        '.name .title' : data.OutletName,
        '.address, .address-mobile': data.OutletAddress,
        '.num' : data.OutletPhone.replace(/[^0-9.]/g, ""),
    });
    if(data.OutletPhone.replace(/[^0-9.]/g, "") == ''){
        $html.find('.num').html('Đang cập nhật');
        $html.find('.tel').removeClass('tel');
    }
    $html.find('.tel').attr('href','tel:' + data.OutletPhone.replace(/[^\d\+]/g,""));

    return $html[0];
}

function moveToOutlet(code,$this){
    // var $this = $(event.target).closest('[code]');
    // var $target = $(event.target);

     


   

    $(".ct-box .item.active").removeClass('active');
    $this.addClass('active');

    for(var i = 0; i <= markers.length; i++){
        if(markers[i].OutletCode == code){
            // var location = markers[i].Location.split(',');
            map.getMap().panTo({
                lng: markers[i].position.lng(),
                lat: markers[i].position.lat()
            });

            map.toggleBounce(markers[i]);
            // markers[i].setAnimation(google.maps.Animation.BOUNCE);
            // setTimeout(function() {  markers[i].setAnimation(null);}, 3000);
            // if (map.getMap().getZoom() < 14) map.getMap().setZoom(14);
            return;
        }
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function disscroll(){
    var iOS = !!navigator.userAgent && /iPad|iPhone|iPod/i.test(navigator.userAgent);
    // var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    // if(typeof $('body').fullpage != 'function'){
        if($(window).width() < 768 && iOS){
            if($('.map-w').hasClass('show')){
                $('body,html').addClass('disscroll');
            }else{
                $('body,html').removeClass('disscroll');
            }
        }
    // }
    
}

// Gooogle analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-99286296-1', 'auto');
ga('send', 'pageview');
