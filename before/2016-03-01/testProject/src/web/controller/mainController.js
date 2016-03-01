define(['app','./dialogController'],function(app){

    return app.registerController('heardController',['$scope','commonService', '$modal',function($scope, commonService, $modal){
        $scope.login = function(){
        var modalInstance;
        return modalInstance = $modal.open({
            templateUrl: '/partials/dialog.html',
            controller: 'dialogController',
            windowClass: 'setting-dialog',
            backdrop:"static",
                }).result.then(function(data) {

                console.log(data);
                });
        }

    }])
});