define(['directives/baseDirective'],function(module){

    return module.directive('heymanVideo',['$http', '$interval', '$parse', '$sce',function($http, $interval, $parse, $sce){
        return {
            restrict:'A',
            scope:{
              getCurrentTime:'&',
              video:'='
            },
            link:function(scope, elem, attr){
                var timer, callbackTimer, duration, media, $barPoint, $barProgress, $btnPaly, $btnVolume, $volumeProgress, $playerMaxi;
                var mousedown = false;
                var value = 0;
                scope.currentTime="00:00";
                scope.videoParams = {
                    "videoURL":"../player/test.flv",
                    "timerTime":5000,

                };
                angular.extend(scope.videoParams, scope.video);
                //scope.videoParams.videoURL = "http://its.resource.augmentum.com.cn:8013/its/M00/00/00/rBQCZFOD8d6ATGELCJWAZGFH7qA856.mp4";
                //"../player/test.flv"
                media = $(elem).find('video').get(0);
                var ddd= $(elem).find('video');
                ddd.requestFullScreen();
                launchFullscreen(media) ;
                console.log($(elem).find('video').trigger("fullscreen"));
                media.src= scope.videoParams.videoURL;
                $("#volume-progress").css({"height":(media.volume*100)+"%"});
                $barPoint = ($(elem).closest('.video-player').find(".progress-point"));
                $btnPlay = ($(elem).closest('.video-player').find(".btn-play"));
                $barProgress = ($(elem).closest('.video-player').find(".bar-progress"));
                $btnVolume = ($(elem).closest('.video-player').find(".btn-volume"));
                $volumeProgress = ($(elem).closest('.video-player').find(".volume-progress"));
                $volumePoint = ($(elem).closest('.video-player').find(".volume-progress-point"));
                $barVolume = ($(elem).closest('.video-player').find(".bar-volume"));
                $playerMaxi = ($(elem).closest('.video-player').find(".player-maxi"));
                $btnPlay.on("click",function(){
                    $(this).toggleClass("btn-play-pause");
                    startOrPasue();
                });

                function launchFullscreen(element) {
                  if(element.requestFullscreen) {
                    element.requestFullscreen();
                  } else if(element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                  } else if(element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                  } else if(element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                  }
                }
                $barPoint.on('mousedown',function(e){
                    duration = media.duration;
                    var offset =  $barProgress.offset();
                    $(document).on('mousemove',function(e){
                        var x = e.pageX - offset.left;
                        media.currentTime = duration *(x/$barProgress.width());
                        $("#progress-current").css({"width":x});
                    });
    
                });

                $(document).on('mouseup',function(){
                    $(document).off("mousemove");
                });

                function _startPlay() {
                    media.play();
                    timer = $interval(function(){
                        var width = media.currentTime/media.duration;
                        $("#progress-current").css({"width":(width*100)+ "%"});
                        scope.currentTime = _formatSeconds(media.currentTime);
                    }, 500);
                    _timmerCallBack();
                }

                function _pause() {
                    if (timer){
                        media.pause();
                        $interval.cancel(timer);
                        timer = undefined;
                    }
                    _closeTimmerCallBack();
                }
                function startOrPasue(){
                     if (timer) {
                        _pause();
                     } else {
                        _startPlay();
                     }
                }

                /*volume progress*/
                $volumeProgress.on("mousedown",function(){
                   
                });

                $volumePoint.on("mousedown",function(){
                    var offset =  $volumeProgress.offset();
                     $barVolume.on('mousemove',function(e){
                        var y = e.pageY - offset.top;
                        y = y/$volumeProgress.height();
                        if(0<=y && y<=1){
                            y = 1-y;
                        } else if(y<0){
                            y = 1;
                        } else {
                            y = 0;
                        }
                        media.volume = y;
                        $("#volume-progress").css({"height":(y*100)+"%"});
                    });
                });
                $volumePoint.on("mouseup",function(){
                    $barVolume.off("mousemove");
                })
               $barVolume.on("mouseleave",function(){
                    $barVolume.off("mousemove");
                     $barVolume.addClass("volume-visibility");
                });

                $btnVolume.on("mouseenter", function(){
                    $barVolume.removeClass("volume-visibility");
                })

                $btnVolume.on("mouseleave",function(){
                     $barVolume.addClass("volume-visibility");
                });

                $barProgress.on("click", function(e){
                    var offset =  $barProgress.offset();
                    var x = e.pageX - offset.left;
                    media.currentTime = media.duration *(x/$barProgress.width());
                    $("#progress-current").css({"width":x});
                });
                $volumeProgress.on("click", function(e){
                    var offset =  $(this).offset();
                     var y = e.pageY - offset.top;
                        y = y/$volumeProgress.height();
                        if(0<=y && y<=1){
                            y = 1-y;
                        } else if(y<0){
                            y = 1;
                        } else {
                            y = 0;
                        }
                        media.volume = y;
                        $("#volume-progress").css({"height":(y*100)+"%"});
                });
                $playerMaxi.on("click",function(){
                    /*media.*/
                })
                function _formatSeconds(value) {
                    var theTime = parseInt(value);// 秒
                       var minutes = 0;// 分
                       var hours = 0;// 小时
                       if(theTime > 60) {
                           minutes = parseInt(theTime/60);
                           theTime = parseInt(theTime%60);
                               if(minutes > 60) {
                               hours = parseInt(minutes/60);
                               minutes = parseInt(minutes%60);
                               }
                        }
                        var result = _timeStyle(parseInt(theTime));
                        if(minutes > 0) {
                            result = _timeStyle(minutes)+":"+result;
                        } else {
                            result = "00:"+result;
                        }
                        if(hours > 0) {
                            result = _timeStyle(hours)+":"+result;
                        }
                       return result;
                }
                function _timeStyle(data){
                    if(data < 10) {
                        return '0'+data;
                    } else {
                        return data;
                    }
                }
                function _timmerCallBack(){
                    callbackTimer =  $interval(function(){
                        scope.getCurrentTime()(media.currentTime);
                    }, scope.videoParams.timerTime);
                }
                function _closeTimmerCallBack(){
                    if(!callbackTimer) {
                        $interval.cancel(callbackTimer);
                        callbackTimer = undefined;
                    }
                    
                }
            }
        }

    }])
})