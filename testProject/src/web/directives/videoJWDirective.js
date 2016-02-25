define(['directives/baseDirective','jwplayer'],function(module, jwplayer){

    return module.directive('heymanJwplayer',['$http',function($http){
        return {
            restrict:'A',
           
            link:function(scope, elem, attr){
                
                var palyer = jwplayer('video-container').setup({       
                file: 'http://its.resource.augmentum.com.cn:8013/its/M00/00/00/rBQCZFOD8d6ATGELCJWAZGFH7qA856.mp4',         
                width: '640',          
                height: '480'
      
            });
     
            }
        }

    }])
})