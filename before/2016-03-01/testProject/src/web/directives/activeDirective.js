define(['directives/baseDirective'],function(module){

    return module.directive('heyActive',['$http',function($http){
        return {
            restrict:'A',
            link:function(scope, elem, attr){
                $(elem).on("click",function(){
                    $(this).closest("ul").find("li").removeClass("active");
                    $(this).addClass("active");
                })
            }
        }

    }])
})