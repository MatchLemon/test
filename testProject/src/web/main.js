var jsUrl = 'module/bower/';
require.config({
    paths: {
        jquery: jsUrl + 'jquery',
        car: 'js/car',
        angular : jsUrl + 'angular',
        app : 'app',
        angularUIRouter : jsUrl + 'angular-ui-router' ,
        angularLazyLoad: jsUrl + 'angular-couch-potato',
        angularFileUpload: jsUrl + 'angular-file-upload',
    },
    shim: {
            angular: {
                exports: 'angular'
            },
            angularUIRouter: ['angular'],
            angularLazyLoad: ['angular'],
            angularFileUpload:['angular']
        },
    deps:['bootStrap']
});
 
/*require(['jquery'], function($) {
    alert($().jquery);
});*/
