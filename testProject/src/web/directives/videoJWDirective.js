define(['directives/baseDirective','jwplayer'],function(module, jwplayer){

    return module.directive('heymanJwplayer',['$http','$interval',function($http, $interval){
        return {
            restrict:'A',
            scope:{
                video:'='
            },
            link:function(scope, elem, attr){
                var callbackTimer;
                scope.videoParams = {
                    "videoURL":"../player/test.flv",
                    "timerTime":5000,
                    "seek":0
                };
                angular.extend(scope.videoParams, scope.video);
                var player = jwplayer('video-container').setup({       
                file: scope.videoParams.videoURL,         
                width: '100%',          
                height: '480',
                events: {

                    onComplete:function() { 
                        if(callbackTimer){$interval.cancel(callbackTimer); callbackTimer = undefined; }
                        scope.videoParams.videoFinished(player.getPosition());
                    },
                    onPlay:function(){ _timmerCallBack(); },
                    onPause:function(){
                        if(callbackTimer){$interval.cancel(callbackTimer); callbackTimer = undefined; }
                    },
               // seek:scope.videoParams.seek,
                },
                   
                });
                //player.play(true);
                //player.seek(100);
                function _timmerCallBack(){
                    callbackTimer =  $interval(function(){
                        scope.videoParams.getCurrentTime(player.getPosition());
                    }, scope.videoParams.timerTime);
                }
            }
        }

    }])
})