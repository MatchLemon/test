define(['angular' ,"jquery", "app",'./controller/mainController'],function(angular){
    return $(document).ready(function(){
        return angular.bootstrap(document, ['Ag']);
    });
});