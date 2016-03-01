define(['directives/baseDirective'],function(module){

    return module.directive('demo',['$http',function($http){
        return {
            restrict:'A',
            scope:{
                demoVa:"=",
            },
            replace: true,
            template:'<div><input type="button" ng-click="demoClick()" value="demoClick"></div>',
            link:function(scope, elem, attr){
                scope.demoClick = function(){
                    scope.demoVa = scope.demoVa + 1 ;
                }
            }
        }

    }])
})