define(['directives/baseDirective'],function(module){
    return module.directive('table',['$http',function($http){
        return {
            restrict:'A',
            scope:{
                click:'&',
                inputValue:'=',
                ngfun:'=',
            },
            templateUrl:'partials/table.html',
            link:function(scope, elem, attr){
                scope.click1 = function(){
                    scope.click();
                    scope.ngfun.setValues("5225");
                    //scope.setValues("555");
                }
                
                scope.click3 = function(){
                   scope.inputValue = scope.inputValue + 1;
                }
            }
        };

    }])
})