define(['directives/baseDirective'],function(module){

    return module.directive('heymanVideo',['$http', '$interval',function($http, $interval){
        return {
            restrict:'A',
            link:function(scope, elem, attr){
                var timer, duration, media, $barPoint, $barProgress, $btnPaly, $btnVolume, $volumeProgress;
                var mousedown = false;
                var value = 0;
                media = $(elem).get(0);
                $("#volume-progress").css({"height":(media.volume*100)+"%"});
                $barPoint = ($(elem).closest('.video-player').find(".progress-point"));
                $btnPlay = ($(elem).closest('.video-player').find(".btn-play"));
                $barProgress = ($(elem).closest('.video-player').find(".bar-progress"));
                $btnVolume = ($(elem).closest('.video-player').find(".btn-volume"));
                $volumeProgress = ($(elem).closest('.video-player').find(".volume-progress"));
                $volumePoint = ($(elem).closest('.video-player').find(".volume-progress-point"));
                $barVolume = ($(elem).closest('.video-player').find(".bar-volume"));

                $btnPlay.on("click",function(){
                    $(this).toggleClass("btn-play-pause");
                    startOrPasue();
                });

                $barPoint.on('mousedown',function(e){
                    duration = $(elem).prop("duration")
                    var offset =  $barProgress.offset();
                    $(document).on('mousemove',function(e){
                        var x = e.pageX - offset.left;
                        $(elem).prop("currentTime",duration *(x/$barProgress.width()))
                        $("#progress-current").css({"width":x});
                    });
    
                });

                $(document).on('mouseup',function(){
                    $(document).off("mousemove");
                });

                function _startPlay() {
                    $(elem).trigger('play');
                    timer = $interval(function(){
                      var width = $(elem).prop("currentTime")/$(elem).prop("duration");
                      $("#progress-current").css({"width":(width*100)+ "%"});
                    }, 500);
                }

                function _pause() {
                    if (timer){
                        $(elem).trigger('pause');
                        $interval.cancel(timer);
                        timer = undefined;
                    }
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
                        var x = e.pageY - offset.top;
                        x = x/$volumeProgress.height();
                        if(0<=x && x<=1){
                            x = 1-x;
                        } else if(x<0){
                            x = 1;
                        } else {
                            x = 0;
                        }
                        media.volume = x;
                        $("#volume-progress").css({"height":(x*100)+"%"});
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
            }
        }

    }])
})