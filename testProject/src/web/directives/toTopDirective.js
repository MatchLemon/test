define(['directives/baseDirective'],function(module){

    return module.directive('toTop',['$interval', function($interval){
        return {
            restrict:'A',
            replace: true,
            template:'<div class="scroll-top" ng-click="toTop()"><span class="to-top">TOP</span></div>',
                link:function(scope, elem, attr){

                    window.onscroll = function(){ 
                        var t = document.documentElement.scrollTop || document.body.scrollTop;  
                        if( t < 200 ){
                            $(elem).css ({"display":"none"});
                        }else{
                              $(elem).css({"display":"inline-block"});
                        }
                    }

                   var timer, currentPosition;

                    scope.toTop = function() {
                        timer = setInterval("runToTop()",1); 
                    }

                   window.runToTop = function (){ 
                        currentPosition = document.documentElement.scrollTop || document.body.scrollTop; 
                        currentPosition -= 10; 
                        if(currentPosition > 0) { 
                            window.scrollTo(0,currentPosition); 
                        } else { 
                            window.scrollTo(0,0); 
                            clearInterval(timer); 
                        } 
                    } 
                }
        }

    }])
})