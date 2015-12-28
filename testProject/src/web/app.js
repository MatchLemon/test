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

app.factory('myInterceptor', ['$q', function($q) {
    var isService=false;
    var responseInterceptor = {
          request: function(config) {
            var url = config.url;
            isService  = url.indexOf("api") == -1 ? false : true;
            console.log(config);

            return config;
          },
          response: function(response) {
            var deferred = $q.defer();
                deferred.resolve(response);
           if (isService){
            console.log(response);
           }
            
            return deferred.promise;
        }
    };

    return responseInterceptor;
}]);
    //lazy config
    app.run(['$couchPotato', function($couchPotato) {
       app.lazy = $couchPotato;
    }]);

return app;
});