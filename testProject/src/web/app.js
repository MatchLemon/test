define([
    'angular' ,
    'angularLazyLoad',
    'angularUIRouter',
    'angularFileUpload',
    'uiBootStrap',
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
        'ui.bootstrap',
        ]);
    
    //lazy load
   angularLazyLoad.configureApp(app);


    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$couchPotatoProvider','$httpProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $couchPotatoProvider,$httpProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/login');
        $httpProvider.interceptors.push('myInterceptor');

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

    app.factory('myInterceptor', ['$q', '$location', function($q, $location) {
        var isService=false;
        var responseInterceptor = {
              request: function(config) {
                var url = config.url;
                isService  = url.indexOf("api") == -1 ? false : true;
                //console.log(config);

                return config;
              },
              response: function(response) {
                var deferred = $q.defer();
                    deferred.resolve(response);
               if (isService){
                   // $location.path('/login');
                   // console.log(response);
                   // return ;
               }
                
                return deferred.promise;
            }
        };

    return responseInterceptor;
}]);
    //lazy config
    app.run(['$couchPotato','$rootScope', 'commonService', '$location', function($couchPotato, $rootScope, commonService, $location) {
       app.lazy = $couchPotato;
         $rootScope.$on('$stateChangeStart', function(event, next, params) {
                var permission = (commonService.getUser() !== undefined);
                   console.log( commonService.md5("123456"));

                if (!permission) {
                    //$location.path('/login');
                }
            });
    }]);

return app;
});