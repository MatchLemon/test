define(['directives/baseDirective'],function(module){

    return module.directive('heymanVideo',['$http',function($http){
        return {
            restrict:'A',
            link:function(scope, elem, attr){
                var videoMedia = elem;
                console.log($(elem).currentTime);
                 console.log(scope);
                var duration = videoMedia.duration;
            console.log(duration);
        window.setProgress = function(){
            var width = (videoMedia.currentTime)/duration;
            console.log(duration);
                $("#progress-current").css({"width":30+ "%"});
           };
        setInterval("setProgress()",1000) ;
            }
        }

    }])
})