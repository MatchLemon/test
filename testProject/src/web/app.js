define([
    'angular' ,
    'angularLazyLoad',
    'angularUIRouter',
    'angularFileUpload',
    'ngFileUpload',
    'uiBootStrap',
    'service/commonService',
    'directives/listDirective',
    'directives/demoDirective',
    'directives/tabsDirective',
    'directives/toTopDirective',
    'angularUeditor'
    ], function(angular, angularLazyLoad){
    var app = angular.module('Ag',[
        'ui.router', 
        'scs.couch-potato',
        'angularFileUpload',
        'Ag.service',
        'Ag.directive',
        'ui.bootstrap',
        'ngFileUpload',
        'ng.ueditor'
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

               
            }).
            state("tabs", {
                url: "/tabs",
                templateUrl: "partials/demoTab.html",
                controller: 'tabsController',
                        resolve: {
                            l: $couchPotatoProvider.resolveDependencies([
                                'controller/tabsController', 
                            ])
                        }

               
            }).
            state('course-detail',{
                url:'/course-detail',
                templateUrl:'partials/course-detail.html',
                controller: 'courseDetailController',
                        resolve: {
                            l: $couchPotatoProvider.resolveDependencies([
                                'controller/courseDetailController', 
                            ])
                        }

            }).
            state('ngUploadFile',{
                url:'/ng-file-upload',
                templateUrl:'partials/ng-upload-file.html',
                controller: 'ngFileUploadController',
                        resolve: {
                            l: $couchPotatoProvider.resolveDependencies([
                                'controller/uploadNgFileController', 
                            ])
                        }

            }).
            state('catalog-list',{
                url:'/catalog-list',
                templateUrl:'partials/catalog-list.html',
                controller: 'catalogListMainController',
                        resolve: {
                            l: $couchPotatoProvider.resolveDependencies([
                                'controller/catalogListMainController', 
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

    window.onscroll = function(){ 
    var t = document.documentElement.scrollTop || document.body.scrollTop;  
    if( t > 200 ){
        $(".")
    }
}
    
    
/*app.directive("required",[function(){
    return function(scope, elem, attr){
        $(elem).on("focus",function(){
            if($(elem).find("option").length==0){
                window.scrollTo(0,100);
            }
        })
    }
}]);*/
return app;
});