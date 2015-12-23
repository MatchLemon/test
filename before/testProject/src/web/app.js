define([
    'angular' ,
    'angularLazyLoad',
    'angularUIRouter',
    'service/commonService',
    'directives/listDirective'
    ], function(angular, angularLazyLoad){
    var app = angular.module('Ag',[
        'ui.router', 
        'scs.couch-potato',
        'Ag.service',
        'Ag.directive',
        ]);
    
    //lazy load
   angularLazyLoad.configureApp(app);


    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$couchPotatoProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $couchPotatoProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state("login", {
                url: "/login",
                templateUrl: "partials/login.html"
            }).
            state('main',{
                url:'/main',
                templateUrl:"partials/main.html"

            }).
            state('list',{
                url:'/list',
                templateUrl:'partials/list.html',
                controller: 'listController',
                        resolve: {
                            l: $couchPotatoProvider.resolveDependencies([
                                'controller/listController', 
                            ])
                        }

            })
        }]);

    //lazy config
    app.run(['$couchPotato', function($couchPotato) {
       app.lazy = $couchPotato;
    }]);

return app;
});