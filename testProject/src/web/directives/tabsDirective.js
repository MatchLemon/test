define(['directives/baseDirective'],function(module){

    return module.directive('clTabs',['$location',function($location){
        return {
            restrict:'A',
            scope:{
                tabs: '=',
                change: '&changeTab'
            },
            replace: true,
            require: '?ngModel',
            //template:'<div><input type="button" ng-click="demoClick()" value="demoClick"></div>',
            templateUrl:'partials/tabs.html',
            link:function(scope, elem, attr, ngModel){
                var curTab;
                 scope.$watch('tabs', function(newVal) {
                    curTab = parseInt($location.search().active);
                      
                    scope.curTab = (!isNaN(curTab) ? curTab : 0);
                    return scope.tabs[scope.curTab].active = true;
                 });
                   
                scope.tabClick = function (index) {
                    console.log(index);
                    angular.forEach(scope.tabs, function(tab) {
                        tab.active = false;
                    });

                    $location.search({
                        active: index
                    });
                    scope.tabs[index].active = true ;
                    scope.change();
                }

                if (ngModel != null) {
                    ngModel.$setViewValue(scope.tabs[index]);
                    
                }
            }
        }

    }])
})