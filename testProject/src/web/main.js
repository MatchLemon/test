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
        md5:jsUrl +'md5.min',
        uiBootStrap: jsUrl + 'ui-bootstrap-tpls.min',
        ngFileUpload: jsUrl +"ng-file-upload-bower-12.0.1/ng-file-upload"
    },
    shim: {
            angular: {
                exports: 'angular'
            },
            angularUIRouter: ['angular'],
            angularLazyLoad: ['angular'],
            uiBootStrap: ['angular'],
            angularFileUpload:['angular'],
            ngFileUpload:['angular']
        },
    deps:['bootStrap']
});
 
/*require(['jquery'], function($) {
    alert($().jquery);
});*/
