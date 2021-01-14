;(function($,window,document,undefinde){
    var jason = {
        init:function(){
            var that = this;
            that.headerFn();
            that.section1Fn();
            that.section2Fn();
            that.section3Fn();
            that.section4Fn();
            that.section5Fn();
        },
        headerFn:function(){
            var win = $(window);
            var winW = win.innerWidth();
            var that = null;
            var $scr = false;
            var t = false;
            var m = 0; //메뉴 클릭 전
            var s = 1;
            var menuT = 124;

            $('#header').on({
                mouseenter:function(){
                    that = $(this);
                    $(this).removeClass('addHeader');
                },
                mouseleave:function(){
                    that = $(this);
                    if( $scr === false && m === 0 ){
                        that.addClass('addHeader');
                    }
                }
            });

            win.scroll(function(){
                that = $(this);
                if( that.scrollTop() > 30 ){
                    $scr = true;
                    $('#header').removeClass('addHeader');
                    if( t == false ){ 
                        t = true;
                        var headerH = $('#header').height();
                        $('html,body').stop().animate({ scrollTop:$('#section2').offset().top-headerH }, 600, 'easeInOutExpo');
                    }
                }else if( $(this).scrollTop() <= 30 ){
                    t = false;
                    $scr = false;
                    if( m === 0 ){ // 햄버거 메뉴 클릭안된상태만 헤더 배경
                        $('#header').addClass('addHeader');
                    }
                }
            });

            setTimeout(resizeFn, 10);
            function resizeFn(){
                winW = win.innerWidth();

                if(winW > 780 ){
                    menuT = 124;
                    console.log(menuT);
                }else{
                    menuT = 77;
                    console.log(menuT);     
                }
            }
            win.resize(function(){
                resizeFn();
                $('#nav').stop().animate({top:-500},0);
                $('.menu-bar').removeClass('addBtn')             
            });

            $('.menu-bar').on({
                click:function(e){
                    e.preventDefault();
                    if(m == 0){
                        m = 1;
                        s = 1;
                        console.log(menuT);
                        resizeFn();
                        $('#nav').stop().animate({top:s*menuT},300);  // s는 부호 '+'
                    }else {
                        m = 0;
                        s = -1;
                        $('#nav').stop().animate({top:s*500},300); // s는 부호 '-'
                    }
                    $(this).toggleClass('addBtn');
                }
            });

            $('.mainBtn').on({
                mouseenter:function(){
                    if( win.innerWidth() < 800 ){
                        $('.sub-box').stop().slideUp(300);
                        $(this).next().stop().slideDown(300);
                    }
                }            
            });

            $('#nav').on({
                mouseleave:function(){
                    $('.sub-box').stop().slideUp(300);
                }
            });

           

        },
        section1Fn:function(){
            var cnt = 0;
            var n = $('#section1 .slide').length;
            var setId = null;
            var setId2 = null;
            var t = 0;

            // 슬라이드 공식
            function nextFn(){
                cnt++;
                mainSlideFn();
            }
            function prevFn(){
                cnt--;
                mainSlideFn();
            }
            function mainSlideFn(){
                $('#section1 .slide-wrap').stop().animate({left:-(100*cnt)+'%'}, 600,function(){
                    if(cnt>n-3){cnt=0;}
                    if(cnt<0){cnt=n-3;}
                    $('#section1 .slide-wrap').stop().animate({left:-(100*cnt)+'%'}, 0);
                });
                pageBtnFn(cnt);
            }
            // 페이지 버튼
            function pageBtnFn(z){
                z>n-3?z=0:z;
                z==-1?z=n-3:z;
               // console.log(z)
                $('#section1 .page-btn').removeClass('addCarent');                
                $('#section1 .page-btn').eq(z).addClass('addCarent');                
            }
            $('#section1 .page-btn').each(function(idx){
                $(this).on({
                    click:function(event){
                        event.preventDefault();
                        clearInterval(setId);
                        cnt == idx;
                        mainSlideFn();
                        timmerCntFn();
                    }
                });
            });

            $('#section1 .next-wrap').on({
                click:function(event){
                    event.preventDefault();
                    clearInterval(setId);
                    timmerCntFn();

                    if( !$('#section1 .slide-wrap').is(':animated') ){
                        nextFn();
                    }
                }
            });
            
            $('#section1 .prev-wrap').on({
                click:function(event){
                    event.preventDefault();
                    clearInterval(setId);
                    timmerCntFn();

                    if( !$('#section1 .slide-wrap').is(':animated') ){
                        prevFn();
                    }
                }
            });

            // 스와이프
            $('#section1 .slide-container').swipe({
                swipeLeft:function(event){
                    event.preventDefault();
                    clearInterval(setId);
                    timmerCntFn();

                    if( !$('#section1 .slide-wrap').is(':animated') ){
                        nextFn();
                    }
                },
                swipeRight:function(event){
                    event.preventDefault();
                    clearInterval(setId);
                    timmerCntFn();

                    if( !$('#section1 .slide-wrap').is(':animated') ){
                        prevFn();
                    }
                }
            });

            // 타이머
            function timmerFn(){
              setId =  setInterval(nextFn, 4000);
            }

            setTimeout(timmerFn, 10);

           function timmerCntFn(){
               clearInterval(setId);
               clearInterval(setId2);
               
               setId2 = setInterval(function(){
                   t++;
                if(t>10){
                    timmerFn();
                    nextFn();
                    clearInterval(setId2);
                }
                }, 4000);
           }
            // smooth-btn //
            $('.smooth-btn').on({
                click:function(e){
                    e.preventDefault();
                    var url = $(this).attr('href'); 
                    var headerT = $('#header').height(); //header
                    $('html,body').stop().animate({ scrollTop:$( url ).offset().top-headerT }, 600);
                }
            });

             //resize
            var winW = $(window).width();
            var winH = $(window).height();
             
             
            function resizeFn(){
                winW = $(window).width();
                winH = $(window).height();

                $('#section1').css({ height:winH });
                $('#section2').css({ marginTop:winH });
                $('#section1 .slide').css({ width:winW});
            }
                
                setTimeout(resizeFn,10);
                
            $(window).resize(function(){
                resizeFn();
            });
        },
        section2Fn:function(){
            var win = $(window);
            
            var gal = $('.gallery > li');
            var galW = gal.width();
            var galH = galW*0.832468967;

            function resizeFn(){
                gal = $('.gellery > li');
                galW = gal.width();
                galH = galW*0.832468967;

                gal.css({ height:galH });
            }
            setTimeout(resizeFn, 10);

            win.resize(function(){
                resizeFn();
            });
        },
        section3Fn:function(){
            var win = $(window);
            var winW = win.innerWidth();
            var s3PageB = $('.s3-pageBtn').innerWidth();
            var s3bg = $('.img-bg').innerWidth();
            
        function resizeFn(){
            // 박스넓이
            winW = win.innerWidth();
            s3PageB = $('.s3-pageBtn').innerWidth();
            s3bg = $('.img-bg').innerWidth();
            
            if(winW<=1360){
                $('.s3slide-view').css({height:0.419117647*winW});
                $('.s3-pageBtn').css({ height:s3PageB });
                $('.img-bg').css({ height:s3bg })
            }else{
                $('.s3slide-view').css({height:570});
            }
        }
        setTimeout(resizeFn, 10);

        win.resize(function(){
            resizeFn();
        });

        /* 글라이드 */
        var cnt   = 0;
        var n     = $('#section3 .s3-slide').length-1;
        var a     = [];

        function mainNextSlideFn(){
            $('#section3 .s3-slide').css({ zIndex:1 }); //초기화 모든 슬라이드
            $('#section3 .s3-slide').eq(cnt==0?n:cnt-1).css({ zIndex:2 }); // 이전슬라이드
            $('#section3 .s3-slide').eq(cnt).css({ zIndex:3 }).stop().animate({ opacity:0 }, 0).animate({ opacity:1 }, 1000); //현재 슬라이드 보이게
            s3pageBtnFn();
        }

        function mainPrevSlideFn(){
            $('#section3 .s3-slide').css({ zIndex:1, opacity:1 }); //초기화 모든 슬라이드
            $('#section3 .s3-slide').eq(cnt).css({ zIndex:2 }); // 이전슬라이드
            $('#section3 .s3-slide').eq(cnt==n?0:cnt+1).css({ zIndex:3 }).stop().animate({ opacity:1 }, 0).animate({ opacity:0 }, 1000); //현재 슬라이드 없어지며 뒤에께 보이게
            s3pageBtnFn();
        }

        function nextCountFn(){
            cnt++;
            if(cnt>n){cnt=0;}
            mainNextSlideFn();
        }
        function prevCountFn(){
            cnt--;
            if(cnt>0){cnt=n;}
            mainPrevSlideFn();
        }
        $('.s3-nextBtn').on({
            click:function(e){
                e.preventDefault();
                nextCountFn();
            }
        });
        $('.s3-prevBtn').on({
            click:function(e){
                e.preventDefault();
                prevCountFn();
            }
        });

        // 다른 슬라이드 페이지
        function s3pageBtnFn(){
        //    switch(cnt){
        //        case 0:
        //        $('.s3-pageBtn').eq(0).css({ 'background-image':'url(./img/s3slide2.jpg)' });    
        //        $('.s3-pageBtn').eq(1).css({ 'background-image':'url(./img/s3slide3.jpg)' });
        //            break;
        //        case 1:
        //        $('.s3-pageBtn').eq(0).css({ 'background-image':'url(./img/s3slide1.jpg)' });    
        //        $('.s3-pageBtn').eq(1).css({ 'background-image':'url(./img/s3slide3.jpg)' });
        //            break;
        //        case 2:
        //        $('.s3-pageBtn').eq(0).css({ 'background-image':'url(./img/s3slide1.jpg)' });    
        //        $('.s3-pageBtn').eq(1).css({ 'background-image':'url(./img/s3slide2.jpg)' });
        //        
        //    }
         switch(cnt){
             case 0:
                 a = [1,2];
                 break;
             case 1:
                 a = [0,2];
                 break;
             case 2:
                 a = [0,1];
                 
             }        

             for(var i=0; i<a.length; i++){
                 $('.s3-pageBtn').eq(i).css({ 'background-image':'url(./img/s3slide'+a[i]+'.jpg)' });
             }
             
        }

        $('.s3-pageBtn').each(function(idx){
           $(this).on({
                click:function(e){
                    e.preventDefault();
                    var imsi = cnt;
                    cnt = a[idx];
                    if(imsi < a[idx]){
                        mainNextSlideFn();
                    }else if(imsi > a[idx]){
                        mainPrevSlideFn();
                    }
                }
            });
        });


        var setId = null;
        function s3timmer(){
            setId = setInterval(nextCountFn, 2000);
        }

        },
         section4Fn:function(){
            var totN            = $('#section4 .slide').length; //10
            var slideN          = 3; //980초과 3, 980이하 2, 600 1
            var $slideContainer = $('#section4 .slide-container');
            var slideW          = $('#section4 .slide-container').innerWidth()/slideN;
            var $slideWrap      = $('#section4 .slide-wrap');
            var $slide          = $('#section4 .slide');
            var $pageBtn        = $('#section4 .pageBtn');
            var $window         = $(window);
            var cnt             = 0;
            var setId           = null;
            var setId2          = null;

                
                function resizeFn(){
                    if($slideContainer.innerWidth()>1024){
                        slideN = 3;
                    }
                    else if($slideContainer.innerWidth()>680){
                        slideN = 2;
                    }
                    else{
                        slideN = 1;
                    }

                    slideW = $slideContainer.innerWidth()/slideN; //슬라이드 1개의 너비
                    $slideWrap.css({width:(slideW*totN), marginLeft:-(slideW*3)}); //3 4 3 고정값
                    $slide.css({width:slideW, height:slideW-40});
                    // $slideWrap.stop().animate({left: -(slideW*cnt) },1000);//동적으로 하고싶으면
                    $slideWrap.stop().animate({left: -(slideW*cnt) },0);   //정적으로 하고싶으면
                    
                }

                setTimeout(resizeFn,10); //처음 로딩 시 once 1번만 실행 또는 새로고침

                $window.resize(function(){ //크기가 변경될 때만 반응
                    resizeFn();
                });




                ////////////////////////////////////////////////////////////////
                ///////   메인 슬라이드 구현  ///////////////////////////////////
                ////////////////////////////////////////////////////////////////

                //1. 메인슬라이드 함수
                function mainSlideFn(){
                    $slideWrap.stop().animate({left: -(slideW*cnt) },600, 'easeOutExpo', function(){
                        if(cnt>3){cnt=0;} //0 ~ 3(4개의 슬라이드)
                        if(cnt<0){cnt=3;}
                        $slideWrap.stop().animate({left: -(slideW*cnt) },0);
                    });
                    pageBtnEventFn();
                }

                //2-1. 다음 카운트 슬라이드 함수
                function nextCountSlideFn(){
                    cnt++;
                    mainSlideFn();
                }
                //2-2. 이전 카운트 슬라이드 함수
                function prevCountSlideFn(){
                    cnt--;
                    mainSlideFn();
                }

                //3. 스와이프 다음/이전 터치 이벤트
                $slideContainer.swipe({
                    swipeLeft:  function(){
                        timerControlFn();
                        if(!$slideWrap.is(':animated')){
                            nextCountSlideFn();
                        }
                    },
                    swipeRight:  function(){
                        timerControlFn();
                        if(!$slideWrap.is(':animated')){
                            prevCountSlideFn();
                        }
                    }
                });

                //4. 페이지버튼 이벤트 함수 - 만들고 하기......
                function pageBtnEventFn(){
                    var z = cnt;
                    if(z>3){z=0}
                    if(z<0){z=3}
                    $pageBtn.removeClass('addPage');
                    $pageBtn.eq(z).addClass('addPage');
                }


                //5. 페이지버튼 클릭 이벤트 - 만들고 하기......
                //   직접 메인 함수연동
                $pageBtn.each(function(idx){
                    $(this)
                        .on('click', function(e){
                            e.preventDefault();
                            timerControlFn();
                            cnt=idx; //직접 선택한 슬라이드 번호를 이용 메인 슬라이드 함수 호출
                            mainSlideFn();
                        });
                });



                //6. 자동 실행 함수
                function autoPlayFn(){
                    setId = setInterval(nextCountSlideFn,6000);
                }

                autoPlayFn();


                //7. 타이머 콘트롤 함수
                function timerControlFn(){
                    var tcnt = 0 ;
                    clearInterval(setId);
                    clearInterval(setId2);
                    setId2 = setInterval(function(){
                        tcnt++;
                        if(tcnt>=6){
                            clearInterval(setId2);
                            nextCountSlideFn(); //6초 후 바로 실행
                            autoPlayFn(); //자동으로 6초 후에 실행
                        }
                    },1000);
                }

        },
        section5Fn:function(){

        }
    }
    jason.init();
})(jQuery,window,document);