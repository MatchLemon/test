define([
    'angular' ,
    'angularLazyLoad',
    'angularUIRouter',
    'angularFileUpload',
    'service/commonService',
    'directives/listDirective',
    'directives/demoDirective'
    ], function(angular, angularLazyLoad){
    var app = angular.module('Ag',[
        'ui.router', 
        'scs.couch-potato',
        'angularFileUpload',
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
                views:{
                    "":{
                        templateUrl: "partials/dev/tool.html"
                        },
                    "test@main":{
                        templateUrl:"partials/main.html"
                    }
                }
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

            }).
            state('demo',{
                url:'/demo',
                templateUrl:'partials/demo.html',
                controller: 'demoController',
                        resolve: {
                            l: $couchPotatoProvider.resolveDependencies([
                                'controller/demoController', 
                            ])
                        }

            }).
            state("dev/tool", {
                url: "/dev/tool",
                views:{
                    "":{
                        templateUrl: "partials/dev/tool.html"
                        },
                    "test@dev/tool":{
                        templateUrl:"partials/main.html"
                    }

                }
               
            }).
            state("upload", {
                url: "/upload",
                templateUrl: "partials/upload.html",
                controller: 'uploadController',
                        resolve: {
                            l: $couchPotatoProvider.resolveDependencies([
                                'controller/uploadController', 
                            ])
                        }

               
            }).
            state("progress", {
                url: "/progress",
                templateUrl: "partials/progress-bar.html",
                controller: 'progressController',
                        resolve: {
                            l: $couchPotatoProvider.resolveDependencies([
                                'controller/progressController', 
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